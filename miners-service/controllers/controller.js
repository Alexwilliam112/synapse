const processMinerClient = require("../config/proto/processMiner/grpcClient-processMiner");
const temporalAnalysisClient = require("../config/proto/temporalAnalysis/grpcClient-temporalAnalysis");
const axios = require("axios");
const Eventlog = require("../models/eventlog");

async function requestProcessMining(eventlogData) {
  return new Promise((resolve, reject) => {
    const requestPayload = { eventlog: eventlogData };

    processMinerClient.GetProcessModel(requestPayload, (error, response) => {
      if (error) {
        reject({ name: 503, source: "processMiner-service" });
      } else {
        console.log("Successful Response from processMiner-service");
        resolve(response.models);
      }
    });
  });
}

async function requestTemporalAnalysis(eventlogData) {
  return new Promise((resolve, reject) => {
    const requestPayload = {
      eventlogs: eventlogData,
      CompanyId: 1,
    };

    temporalAnalysisClient.GetTaskHistory(requestPayload, (error, response) => {
      if (error) {
        reject({ name: 503, source: "temporalMiner-service" });
      } else {
        console.log("Successful Response from temporalMiner-service");
        resolve(response.history);
      }
    });
  });
}

async function requestCaseTracing(data) {
  try {
    const response = await axios.post("http://localhost:50052/rpc", data);
    return response;
  } catch (error) {
    throw { name: 503, source: "tracer-service" };
  }
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

      const tasks = await requestTemporalAnalysis(jsonData);
      const models = await requestProcessMining(eventlogs);

      res.status(200).json({
        tasks,
        models
      })
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
