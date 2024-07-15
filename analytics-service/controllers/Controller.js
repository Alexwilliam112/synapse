const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Controller {
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

      const taskRecords = await prisma.task.createMany({
        data: tasks,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Tasks created successfully",
        data: taskRecords,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTableData(req, res, next) {
    try {
      const { startDate, endDate, process, department, person } = req.query;

      const data = await prisma.$queryRaw`
        SELECT
          t."eventName",
          CAST(e."benchmarkTime" AS INTEGER) AS "benchmarkTime",
          AVG(CAST(t."time" AS FLOAT)) AS average_actual,
          CAST(e."ProcessId" AS INTEGER) AS "ProcessId",
          CAST(
            (
              (
                COUNT(t."time") - SUM(
                  CASE
                    WHEN CAST(t."time" AS FLOAT) > CAST(e."benchmarkTime" AS FLOAT) THEN 1
                    ELSE 0
                  END
                )
              ) * 1.0 / COUNT(t."time")
            ) AS FLOAT
          ) AS conformance_rate,
          CAST(COUNT(t."eventName") AS INTEGER) AS total_case
        FROM
          "Task" t
          LEFT JOIN "Event" e ON t."eventName" = e."eventName"
        WHERE
          t."timestamp" BETWEEN '2020-01-01' AND '2024-12-31'
          AND t."department" = 'Marketing Emporio Armani 7'
          AND t."name" = 'Jane Doe'
          AND t."processName" = 'PURCHASE_ORDER'
        GROUP BY
          t."eventName",
          e."benchmarkTime",
          e."ProcessId";
        `;

      console.log(data);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAnalytics(req, res, next) {
    try {
      const { startDate, endDate, process, department, person } = req.query;
      res.send({
        startDate,
        endDate,
        process,
        department,
        person,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
