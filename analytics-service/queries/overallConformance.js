module.exports = function OverallConformance_PieChart(
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
          (SUM(CASE WHEN CAST(t."time" AS FLOAT) <= CAST(e."benchmarkTime" AS FLOAT) THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0)) AS percentage_ontime_process,
          (SUM(CASE WHEN CAST(t."time" AS FLOAT) > CAST(e."benchmarkTime" AS FLOAT) THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0)) AS percentage_non_conformance
        FROM
          "Task" t
          LEFT JOIN "Event" e ON t."eventName" = e."eventName"
      WHERE
        ${whereConditions}
  `;

  return { query, parameters };
};
