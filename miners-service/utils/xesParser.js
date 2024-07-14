const fs = require('fs');
const xml2js = require('xml2js');

function parseXesFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        xml2js.parseString(data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            const log = transformXesToProtobuf(result);
            resolve(log);
          }
        });
      }
    });
  });
}

// Example transformation function to fit the protobuf schema
function transformXesToProtobuf(xesObject) {
  // Transform the XES object to fit your protobuf schema
  const log = {
    attributes: xesObject.log.$ || {},
    extensions: xesObject.log.extension || [],
    globals: xesObject.log.global || [],
    classifier: xesObject.log.classifier || {},
    strings: xesObject.log.string || [],
    traces: (xesObject.log.trace || []).map(trace => ({
      strings: trace.string || [],
      events: (trace.event || []).map(event => ({
        strings: event.string || [],
        dates: event.date || []
      }))
    }))
  };
  return log;
}

module.exports = parseXesFile;
