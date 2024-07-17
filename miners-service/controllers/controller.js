const processMinerClient = require("../config/proto/processMiner/grpcClient-processMiner");
const temporalAnalysisClient = require("../config/proto/temporalAnalysis/grpcClient-temporalAnalysis");
const axios = require("axios");
const Eventlog = require("../models/eventlog");
const { signTokenServer, verifyTokenServer } = require("../utils/jwt");

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
      const { apiKey, startDate, endDate } = req.body.serverPayload;
      const data = req.loginInfo;
      let jsonData
      try {
        const res = await axios.get("http://localhost:4000/eventlog", {
          headers: {
            authorization: apiKey,
          },
          params: {
            startDate,
            endDate,
          },
        });

        jsonData = res.data.data
      } catch (error) {
        console.log("ok");
        next({ name: 503, source: 'su' });
      }

      // const jsonData = require("../data/json/CustomerComplaint.json");
      const goResponse = await requestCaseTracing(jsonData);
      const resData = goResponse.data.preprocessedData;

      const eventlogs = resData.map((el) => {
        return new Eventlog(el.eventlog, el.processes);
      });

      const tasks = await requestTemporalAnalysis(jsonData);
      const models = await requestProcessMining(eventlogs);

      const serverToken = signTokenServer({
        origin: process.env.USER_ORIGIN,
        CompanyId: data.CompanyId,
      });

      const responses = { tasks, models };

      console.log(models[0].arcs);
      console.log(models[0].places);
      console.log(models[0].transitions);

      try {
        await axios.post(
          "http://localhost:3003/upsert",
          { tasks },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${serverToken}`,
            },
          }
        );
        console.log("POSTED TO ANALYTICS");
      } catch (error) {
        next(error);
      }

      try {
        await axios.post(
          "http://localhost:3004/post",
          { models },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${serverToken}`,
            },
          }
        );
        console.log("POSTED TO MODEL ENGINE");
      } catch (error) {
        next(error);
      }

      res.status(200).json({
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
