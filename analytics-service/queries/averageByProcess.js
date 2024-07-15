module.exports = function AverageConformanceByProcess_LineChart(
  queryOptions
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

  let query = `
      SELECT
        t."processName",
        DATE_TRUNC('month', t."timestamp") AS month,
        AVG(CAST(t."time" AS FLOAT)) AS average_actual,
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
        t."processName",
        DATE_TRUNC('month', t."timestamp")
      ORDER BY
        t."processName",
        month;
  `;

  return { query, parameters };
};
