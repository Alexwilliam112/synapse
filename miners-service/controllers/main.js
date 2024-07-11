const { exec } = require('child_process');
const writeXesFile = require('../converter/xesFormat');
const eventLog = require('../data/json/PO_eventLog.json');
const { writeFileSync } = require('fs');

const xesFilePath = './data/xes/eventlog.xes';
writeXesFile(eventLog, xesFilePath);

function execute_AlphaMiner(filePath) {
  exec(`py ./core/alpha_miner.py ${filePath}`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing Python script: ${error.message}`);
          return;
      }
      if (stderr) {
          console.error(`Python script stderr: ${stderr}`);
      }
      if (stdout) {
          console.log(`Python script stdout:\n${stdout}`);
          writeFileSync('./net.json', stdout)
      }
  });
}

function execute_TemporalInterval(filePath, outputPath) {
    exec(`py ./core/temporal_interval.py ${filePath} ${outputPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Python script stderr: ${stderr}`);
        }
        if (stdout) {
            console.log(`Python script stdout:\n${stdout}`);
            writeFileSync('./net.json', stdout)
        }
    });
  }

execute_AlphaMiner(xesFilePath);
// execute_TemporalInterval(xesFilePath, './data/json/output.json')