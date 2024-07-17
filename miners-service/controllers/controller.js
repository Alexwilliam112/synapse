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
        const res = await axios.get(`${process.env.MOCK_SERVER_URL}/eventlog` || "http://localhost:4000/eventlog", {
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
        throw ({ name: 503, source: 'su' });
      }

      const goResponse = await requestCaseTracing(jsonData);
      let resData = goResponse.data.preprocessedData;

      if (!resData) {
        resData = []
      }

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

      try {
        await axios.post(
          `${process.env.ANALYTICS_SERVICE_URL}/upsert` || "http://localhost:3003/upsert",
          { tasks },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${serverToken}`,
            },
          }
        );
      } catch (error) {
        next(error);
      }

      try {
        await axios.post(
          `${process.env.MODEL_ENGINE_SERVICE_URL}/post` || "http://localhost:3004/post",
          { models },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${serverToken}`,
            },
          }
        );
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
