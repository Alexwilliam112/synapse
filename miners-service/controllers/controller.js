const grpcClient = require("../config/proto/pyMiner/grpcClient-pyMiners");

class Controller {
  static async startMining(req, res, next) {
    try {
      const jsonData = require('../data/json/PO_eventLog.json')
      const requestPayload = { data: jsonData };

      grpcClient.GetProcessModel(requestPayload, (error, response) => {
        if (error) {
          next( {name: 503, source: 'pyMiner'})
        } else {
          console.log(response);
          res.send(`Server response: ${response.message}`);
        }
      });
    } catch (err) {
      console.error("Error in startMining:", err);
      next(err);
    }
  }
}

module.exports = Controller;
