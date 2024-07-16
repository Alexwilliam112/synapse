module.exports = function AverageConformanceByTask_RadarChart(
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
        AVG(
          CASE
            WHEN t."time" <= e."benchmarkTime" THEN 1.0
            ELSE 0.0
          END
        ) AS average_conformance_rate
      FROM
        "Task" t
        LEFT JOIN "Event" e ON t."eventName" = e."eventName"
      WHERE
        ${whereConditions}
      GROUP BY
        t."eventName"
      ORDER BY
        t."eventName";
  `;

  return { query, parameters };
};
