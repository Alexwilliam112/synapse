const axios = require("axios");
const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");

module.exports = {
  dashboardTypes: `#graphql
    scalar DateTime

    input DashboardFilter {
      startDate: String
      endDate: String
      department: String
      person: String
      process: String
    }

    type LineChartFloatingPoint {
      label: String
      data: [Float]
    }

    type topTenTableRow {
      rank: Int
      name: String
      avgOverdue: Float
      avgConformance: Float
    }

    type overallConformance_pieChart {
      ontime: Float
      nonConform: Float
    }

    type DashboardTableRow {
      eventName: String
      benchmarkTime: Float
      average_actual: Float
      ProcessId: Float
      conformance_rate: Float
      total_case: Float
    }

    type caseByProcess {
      labels: [String]
      datasets: [Int]
    }

    type conformanceByTask {
      labels: [String]
      datasets: [Int]
    }

    type ChartData {
      averageConformance_areaChart: [Float]
      overallConformance_pieChart: overallConformance_pieChart
      averageConformanceByProcess_lineChart: [LineChartFloatingPoint]
      topTenTable: [topTenTableRow]
      dashboardTable: [DashboardTableRow]
      caseByProcess: caseByProcess
      conformanceByTask: conformanceByTask
    }

    type GetDashboardChartsResponse {
      statusCode: Int
      data: ChartData
    }

    type FiltersResponse {
      departments: [String]
      persons: [String]
      processes: [String]
    }

    type GetFiltersResponse {
      statusCode: Int
      data: FiltersResponse
    }

    type Query {
      GetDashboardCharts(input: DashboardFilter): GetDashboardChartsResponse
      GetFilters: GetFiltersResponse
    }
  `,

  dashboardResolvers: {
    DateTime: DateTimeResolver,

    Query: {
      GetDashboardCharts: async (_, args, context) => {
        let { startDate, endDate, department, person, process } = args.input;

        if (!startDate) startDate = "1000-01-01";
        if (!endDate) endDate = "3000-01-01";

        const token = await context.auth();

        const data = await axios.get("http://localhost:3003/getChartData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { startDate, endDate, department, person, process },
        });

        return {
          statusCode: 200,
          data: data.data
        };
      },

      GetFilters: async (_, __, context) => {
        const token = await context.auth();

        const data = await axios.get("http://localhost:3003/filters", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        return {
          statusCode: 200,
          data: data.data
        };
      }
    },

    Mutation: {},
  },
};
