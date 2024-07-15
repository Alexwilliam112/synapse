module.exports = function DashboardTable(
  queryOptions,
  CompanyId
) {
  const { startDate, endDate, process, department, person } = queryOptions;

  let whereConditions = `
    t."timestamp" BETWEEN $1::timestamp AND $2::timestamp
  `;
  let parameters = [startDate, endDate];

  if (department) {
    whereConditions += ` AND t."department" = $${parameters.length + 1}`;
    parameters.push(department);
  }

  if (person) {
    whereConditions += ` AND t."name" = $${parameters.length + 1}`;
    parameters.push(person);
  }

  if (process) {
    whereConditions += ` AND t."processName" = $${parameters.length + 1}`;
    parameters.push(process);
  }

  if (CompanyId) {
    whereConditions += ` AND t."CompanyId" = $${parameters.length + 1}`;
    parameters.push(CompanyId);
  }

  let query = `
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
        ${whereConditions}
      GROUP BY
        t."eventName",
        e."benchmarkTime",
        e."ProcessId";
  `;

  return { query, parameters };
};
