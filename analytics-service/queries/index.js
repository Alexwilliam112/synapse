const AverageConformance_AreaChart = require("./averageConformance");
const OverallConformance_PieChart = require("./overallConformance");
const AverageConformanceByProcess_LineChart = require("./averageByProcess");
const TopTenNonConformTable = require("./topten");
const DashboardTable = require('./dashboardTable')
const TotalCaseCountPerProcess_BarChart = require('./caseCount')
const AverageConformanceByTask_RadarChart = require('./averageByTask')

module.exports = {
  AverageConformance_AreaChart,
  OverallConformance_PieChart,
  AverageConformanceByProcess_LineChart,
  TopTenNonConformTable,
  DashboardTable,
  TotalCaseCountPerProcess_BarChart,
  AverageConformanceByTask_RadarChart
};
