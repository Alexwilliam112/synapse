module.exports = function groupProcess(input) {
  input.sort((a, b) => {
    if (a.processName === b.processName) {
      return new Date(a.month) - new Date(b.month);
    }
    return a.processName.localeCompare(b.processName);
  });

  const processMap = new Map();

  input.forEach((entry) => {
    const { processName, conformance_rate } = entry;
    const conformancePercentage = conformance_rate * 100;

    if (!processMap.has(processName)) {
      processMap.set(processName, []);
    }

    processMap.get(processName).push(conformancePercentage);
  });

  const output = Array.from(processMap, ([label, data]) => ({ label, data }));

  return output;
};
