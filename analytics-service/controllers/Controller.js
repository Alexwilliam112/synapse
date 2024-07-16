const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const groupProcess = require("../utils/groupProcess");
const {
  AverageConformance_AreaChart,
  OverallConformance_PieChart,
  AverageConformanceByProcess_LineChart,
  TopTenNonConformTable,
  DashboardTable,
  TotalCaseCountPerProcess_BarChart,
} = require("../queries/index");

class Controller {
  static async getFilters(req, res, next) {
    try {
      const departments = await prisma.task.findMany({
        select: {
          department: true,
        },
        distinct: ["department"],
      });

      const persons = await prisma.task.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
      });

      const processes = await prisma.task.findMany({
        select: {
          processName: true,
        },
        distinct: ["processName"],
      });

      res.status(200).json({
        departments: departments.map((d) => d.department),
        persons: persons.map((p) => p.name),
        processes: processes.map((p) => p.processName),
      });
    } catch (error) {
      next(error);
    }
  }

  static async postAnalytics(req, res, next) {
    try {
      let tasks = req.body.tasks;
      if (!Array.isArray(tasks) || tasks.length === 0)
        throw { name: "Invalid" };

      tasks = tasks.map((task) => ({
        ...task,
        timestamp: new Date(task.timestamp).toISOString(),
        time: parseFloat(task.time),
        CompanyId: parseFloat(task.CompanyId),
      }));

      await prisma.task.createMany({
        data: tasks,
      });

      res.status(201).json({
        statusCode: 201,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getChartData(req, res, next) {
    try {
      const {
        query: dashboardTableQuery,
        parameters: dashboardTableParameters,
      } = DashboardTable(req.query);

      const {
        query: totalCaseByProcessQuery,
        parameters: totalCaseByProcessParameters,
      } = TotalCaseCountPerProcess_BarChart(req.query);

      const {
        query: overallConformanceQuery,
        parameters: overallConformanceParameters,
      } = OverallConformance_PieChart(req.query);

      const {
        query: avgConformanceQuery,
        parameters: avgConformanceParameters,
      } = AverageConformance_AreaChart(req.query);

      const { query: avgProcessQuery, parameters: avgProcessParameters } =
        AverageConformanceByProcess_LineChart(req.query);

      const { query: topTenQuery, parameters: topTenParameters } =
        TopTenNonConformTable(req.query);

      const tableData_raw = await prisma.$queryRawUnsafe(
        dashboardTableQuery,
        ...dashboardTableParameters
      );

      const totalCaseByProcess_raw = await prisma.$queryRawUnsafe(
        totalCaseByProcessQuery,
        ...totalCaseByProcessParameters
      );

      const overallConformance_raw = await prisma.$queryRawUnsafe(
        overallConformanceQuery,
        ...overallConformanceParameters
      );
      const avgConformance_raw = await prisma.$queryRawUnsafe(
        avgConformanceQuery,
        ...avgConformanceParameters
      );
      const avgConformanceByProcess_raw = await prisma.$queryRawUnsafe(
        avgProcessQuery,
        ...avgProcessParameters
      );
      const topTenNonConformant_raw = await prisma.$queryRawUnsafe(
        topTenQuery,
        ...topTenParameters
      );

      const tableData = tableData_raw.map((row) => {
        row.conformance_rate = row.conformance_rate * 100;
        return row;
      });

      const caseByProcess_BarChart = {
        labels: [],
        datasets: []
      }
      totalCaseByProcess_raw.forEach(set => {
        caseByProcess_BarChart.labels.push(set.processName)
        caseByProcess_BarChart.datasets.push(set.task_count)
      });

      const averageConformance_areaChart = avgConformance_raw.map((el) => {
        return el.average_conformance_rate;
      });

      const overallConformance_pieChart = {
        ontime: Number(overallConformance_raw[0].percentage_ontime_process),
        nonConform: Number(
          overallConformance_raw[0].percentage_non_conformance
        ),
      };
      const averageConformanceByProcess_lineChart = groupProcess(
        avgConformanceByProcess_raw
      );

      res.status(200).json({
        averageConformance_areaChart,
        overallConformance_pieChart,
        averageConformanceByProcess_lineChart,
        topTenTable: topTenNonConformant_raw,
        dashboardTable: tableData,
        caseByProcess: caseByProcess_BarChart
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
