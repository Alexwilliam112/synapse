const grpcClient = require("../config/proto/pyMiner/grpcClient-pyMiners");
const axios = require("axios");
const Eventlog = require("../models/eventlog");

async function requestProcessMining(eventlogData) {
  return new Promise((resolve, reject) => {
    const requestPayload = { data: eventlogData };

    grpcClient.GetProcessModel(requestPayload, (error, response) => {
      if (error) {
        reject({ name: 503, source: "pyMiner" });
      } else {
        console.log(response);
        resolve(response);
      }
    });
  });
}

async function requestCaseTracing(data) {
  const response = await axios.post("http://localhost:50052/rpc", data);
  return response;
}

class Controller {
  static async startMining(req, res, next) {
    try {
      const jsonData = require("../data/json/eventlog_practice.json");
      const goResponse = await requestCaseTracing(jsonData);
      const resData = goResponse.data.preprocessedData;

      const eventlogs = resData.map((el) => {
        return new Eventlog(el.eventlog, el.processes);
      });

      const models = await requestProcessMining(eventlogs[0].eventlog);
      console.log(models);
      res.json(models);
    } catch (err) {
      console.error("Error in startMining:", err);
      next(err);
    }
  }
}
module.exports = Controller;
