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

    type ChartData {
      averageConformance_areaChart: [Float]
      overallConformance_pieChart: overallConformance_pieChart
      averageConformanceByProcess_lineChart: [LineChartFloatingPoint]
      topTenTable: [topTenTableRow]
    }

    type GetDashboardChartsResponse {
      statusCode: Int
      data: ChartData
    }

    type Query {
      GetDashboardCharts(input: DashboardFilter): GetDashboardChartsResponse
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

        console.log(data.data);

        return {
          statusCode: 200,
          data: data.data
        };
      },
    },

    Mutation: {},
  },
};
