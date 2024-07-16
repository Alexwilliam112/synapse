module.exports = function TotalCaseCountPerProcess_BarChart(
  queryOptions,
  CompanyId
) {
  const { startDate, endDate, process, department, person } = queryOptions;

  let whereConditions = `
    "timestamp" BETWEEN $1::timestamp AND $2::timestamp
  `;
  let parameters = [startDate, endDate];

  if (department) {
    whereConditions += ` AND "department" = $${parameters.length + 1}`;
    parameters.push(department);
  }

  if (person) {
    whereConditions += ` AND "name" = $${parameters.length + 1}`;
    parameters.push(person);
  }

  if (process) {
    whereConditions += ` AND "processName" = $${parameters.length + 1}`;
    parameters.push(process);
  }

  if (CompanyId) {
    whereConditions += ` AND "CompanyId" = $${parameters.length + 1}`;
    parameters.push(CompanyId);
  }

  let query = `
      SELECT
        "processName",
        CAST(COUNT(*) AS INTEGER) AS task_count
      FROM
        "Task"
      WHERE
        ${whereConditions}
      GROUP BY
        "processName"
      ORDER BY
        "processName";
  `;

  return { query, parameters };
};
