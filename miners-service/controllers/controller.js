const grpcClient = require("../config/proto/pyMiner/grpcClient-pyMiners");
const axios = require('axios')

function requestProcessMining() {
  const jsonData = require("../data/json/PO_eventLog.json");
  const requestPayload = { data: jsonData };

  grpcClient.GetProcessModel(requestPayload, (error, response) => {
    if (error) {
      next({ name: 503, source: "pyMiner" });
    } else {
      console.log(response);
      res.send(`Server response: ${response.message}`);
    }
  });
}

async function requestCaseTracing(data) {
  const response = await axios.post('http://localhost:50052/rpc', data);
  return response
}

class Controller {
  static async startMining(req, res, next) {
    try {
      const jsonData = require("../data/json/eventlog_practice.json");
      const goResponse = await requestCaseTracing(jsonData)
      res.json(goResponse.data);
      // requestProcessMining();
    } catch (err) {
      console.error("Error in startMining:", err);
      next(err);
    }
  }
}
module.exports = Controller;