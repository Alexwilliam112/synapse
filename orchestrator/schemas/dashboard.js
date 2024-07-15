const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");

module.exports = {
  dashboardTypes: `#graphql
    scalar DateTime

    input DashboardFilter {
      startDate: String
      endDate: String
      department: String
      name: String
      processName: String
    }

    type ChartData {
    
    }

    type Query {
      GetDashboardCharts(input: DashboardFilter): ChartData
    }

    type Mutation {
      
    }
  `,

  dashboardResolvers: {
    DateTime: DateTimeResolver,

    Query: {},

    Mutation: {},
  },
};
