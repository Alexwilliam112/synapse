module.exports = function TopTenNonConformTable(queryOptions, CompanyId) {
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
    WITH
      overdue_calculation AS (
        SELECT
          t."name",
          CAST(AVG(
            (t."time") - (e."benchmarkTime")
          ) AS FLOAT ) AS avg_overdue
        FROM
          "Task" t
          LEFT JOIN "Event" e ON t."eventName" = e."eventName"
        WHERE
         ${whereConditions}
         AND t."time" > e."benchmarkTime"
        GROUP BY
          t."name"
      ),
      avg_conformance AS (
        SELECT
          t."name" AS name1,
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
          t."name"
      )
    SELECT
      CAST(ROW_NUMBER() OVER (
        ORDER BY
          overdue_calculation.avg_overdue DESC
      ) AS FLOAT) AS Rank,
      overdue_calculation."name" AS Name,
      overdue_calculation.avg_overdue AS "avgOverdue",
      avg_conformance.conformance_rate AS "avgConformance"
    FROM
      overdue_calculation
    JOIN
      avg_conformance
    ON
      overdue_calculation."name" = avg_conformance."name1"
    ORDER BY
      overdue_calculation.avg_overdue DESC
    LIMIT
      10;
  `;

  return { query, parameters };
};
