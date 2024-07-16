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
  AverageConformanceByTask_RadarChart,
} = require("../queries/index");

class Controller {
  static async getFilters(req, res, next) {
    try {
      const departments = await prisma.task.findMany({
        where: {
          CompanyId: Number(req.loginInfo.CompanyId),
        },
        select: {
          department: true,
        },
        distinct: ["department"],
      });

      const persons = await prisma.task.findMany({
        where: {
          CompanyId: Number(req.loginInfo.CompanyId),
        },
        select: {
          name: true,
        },
        distinct: ["name"],
      });

      const processes = await prisma.task.findMany({
        where: {
          CompanyId: Number(req.loginInfo.CompanyId),
        },
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
      } = DashboardTable(req.query, req.loginInfo.CompanyId);

      const {
        query: totalCaseByProcessQuery,
        parameters: totalCaseByProcessParameters,
      } = TotalCaseCountPerProcess_BarChart(req.query, req.loginInfo.CompanyId);

      const {
        query: conformanceByTaskQuery,
        parameters: conformanceByTaskParameters,
      } = AverageConformanceByTask_RadarChart(
        req.query,
        req.loginInfo.CompanyId
      );

      const {
        query: overallConformanceQuery,
        parameters: overallConformanceParameters,
      } = OverallConformance_PieChart(req.query, req.loginInfo.CompanyId);

      const {
        query: avgConformanceQuery,
        parameters: avgConformanceParameters,
      } = AverageConformance_AreaChart(req.query, req.loginInfo.CompanyId);

      const { query: avgProcessQuery, parameters: avgProcessParameters } =
        AverageConformanceByProcess_LineChart(
          req.query,
          req.loginInfo.CompanyId
        );

      const { query: topTenQuery, parameters: topTenParameters } =
        TopTenNonConformTable(req.query, req.loginInfo.CompanyId);

      const tableData_raw = await prisma.$queryRawUnsafe(
        dashboardTableQuery,
        ...dashboardTableParameters
      );

      const totalCaseByProcess_raw = await prisma.$queryRawUnsafe(
        totalCaseByProcessQuery,
        ...totalCaseByProcessParameters
      );

      const conformanceByTask_raw = await prisma.$queryRawUnsafe(
        conformanceByTaskQuery,
        ...conformanceByTaskParameters
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
        let data = row.conformance_rate;
        if (data === null || data === "null") data = 0;

        row.conformance_rate = data * 100;
        return row;
      });

      const caseByProcess_BarChart = {
        labels: [],
        datasets: [],
      };
      totalCaseByProcess_raw.forEach((set) => {
        let data = Number(set.task_count);
        if (data === null || data === "null") data = 0;

        caseByProcess_BarChart.labels.push(set.processName);
        caseByProcess_BarChart.datasets.push(data);
      });

      const conformanceByTask_RadarChart = {
        labels: [],
        datasets: [],
      };
      conformanceByTask_raw.forEach((set) => {
        let data = Number(set.average_conformance_rate);
        if (data === null || data === "null") data = 0;

        conformanceByTask_RadarChart.labels.push(set.eventName);
        conformanceByTask_RadarChart.datasets.push(data);
      });

      const averageConformance_areaChart = avgConformance_raw.map((el) => {
        let data = Number(el.average_conformance_rate);
        if (data === null || data === "null") data = 0;

        return data;
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
        caseByProcess: caseByProcess_BarChart,
        conformanceByTask: conformanceByTask_RadarChart,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
