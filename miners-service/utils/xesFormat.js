const fs = require('fs');
const { create } = require('xmlbuilder2');

function jsonToXes(eventLog) {
  const log = {
    log: {
      '@xes.version': '1.0',
      '@xes.features': 'nested-attributes',
      '@xmlns': 'http://www.xes-standard.org/',
      extension: [
        { '@name': 'Lifecycle', '@prefix': 'lifecycle', '@uri': 'http://www.xes-standard.org/lifecycle.xesext' },
        { '@name': 'Organizational', '@prefix': 'org', '@uri': 'http://www.xes-standard.org/org.xesext' },
        { '@name': 'Time', '@prefix': 'time', '@uri': 'http://www.xes-standard.org/time.xesext' },
        { '@name': 'Concept', '@prefix': 'concept', '@uri': 'http://www.xes-standard.org/concept.xesext' }
      ],
      global: [
        { '@scope': 'trace', string: { '@key': 'concept:name', '@value': 'name' } },
        {
          '@scope': 'event',
          string: [
            { '@key': 'concept:name', '@value': 'name' },
            { '@key': 'lifecycle:transition', '@value': 'complete' }
          ]
        }
      ],
      classifier: { '@name': 'Activity classifier', '@keys': 'concept:name lifecycle:transition' },
      string: { '@key': 'concept:name', '@value': 'Example log' },
      trace: []
    }
  };

  const traces = {};
  
  eventLog.forEach(event => {
    if (!traces[event.caseId]) {
      traces[event.caseId] = {
        string: { '@key': 'concept:name', '@value': event.caseId },
        event: []
      };
      log.log.trace.push(traces[event.caseId]);
    }
    traces[event.caseId].event.push({
      string: [
        { '@key': 'concept:name', '@value': event.eventName },
        { '@key': 'org:resource', '@value': event.name },
        { '@key': 'org:role', '@value': event.department },
        { '@key': 'lifecycle:transition', '@value': 'complete' }
      ],
      date: { '@key': 'time:timestamp', '@value': new Date(event.timestamp).toISOString() }
    });
  });

  return log;
}

module.exports = function writeXesFile(eventLog, fileName) {
  const xesObject = jsonToXes(eventLog);
  const xml = create(xesObject).end({ prettyPrint: true });
  fs.writeFileSync(fileName, xml);
}