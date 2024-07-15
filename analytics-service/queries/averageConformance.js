module.exports = function AverageConformance_AreaChart(
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
    WITH event_conformance AS (
      SELECT
        DATE_TRUNC('month', t."timestamp") AS month,
        t."eventName",
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
        ) AS conformance_rate
      FROM
        "Task" t
        LEFT JOIN "Event" e ON t."eventName" = e."eventName"
      WHERE
        ${whereConditions}
      GROUP BY
        DATE_TRUNC('month', t."timestamp"),
        t."eventName"
    )

    SELECT
      month,
      AVG(conformance_rate) AS average_conformance_rate
    FROM
      event_conformance
    GROUP BY
      month
    ORDER BY
      month;
  `;

  return { query, parameters };
};
