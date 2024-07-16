const { GraphQLError } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");
const axios = require('axios');
const errorHandler = require("../middlewares/errorHandler");

module.exports = {
  diagramTypes: `#graphql
    scalar DateTime

    input InputModelById {
      id: Int!
    }

    type ModelByIdRes {
      statusCode: Int
      data: ModelById
    }

    type ModelRes {
      statusCode: Int
      data: [Process]
    }

    type ModelById {
      id: Int,
      processName: String,
      identifier: String,
      description: String,
      lastUpdate: String,
      fitness: Int,
      CompanyId: Int,
      dataLinks: [dataLinks],
      events: [events],
      states: [states]
    }

    type dataLinks {
      id: Int!,
      canRelinkFrom: Boolean,
      identifier: String,
      from: String,
      to: String,
      text: String,
      ProcessId: Int,
    }

    type events {
      id: Int!,
      eventName: String,
      identifier: String,
      frequency: Int,
      time: Float,
      benchmarkTime: Int,
      isTextEditable: Boolean,
      color: String,
      shape: String,
      ProcessId: Int,
    }

    type states {
      id: Int!,
      eventName: String,
      identifier: String,
      isTextEditable: Boolean,
      color: String,
      shape: String,
      ProcessId: Int,
    }

      input events2 {
      id: Int!,
      eventName: String,
      identifier: String,
      frequency: Int,
      time: Float,
      benchmarkTime: Int,
      isTextEditable: Boolean,
      color: String,
      shape: String,
      ProcessId: Int,
    }

    type Process {
      id: Int!,
      processName: String,
      identifier: String,
      description: String,
      lastUpdate: String,
      fitness: Int,
      CompanyId: Int,
    }
    
    type StatusRes {
      statusCode: Int
    }

    type Query {
      GetAllProcess: ModelRes
      GetById(input: InputModelById): ModelByIdRes
    }

    type Mutation {
      UpdateEvent(input: [events2]): StatusRes
    }
  `,

  diagramResolvers: {
    DateTime: DateTimeResolver,

    Query: {
      GetById: async (_, args, context) => {
        let { id } = args.input;
        const token = await context.auth()

        console.log(token, id);
        const data = await axios.get(`http://localhost:3004/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        console.log(data.data.data);
        errorHandler(data)

        return {
          statusCode: 200,
          data: data.data.data
        };
      },

      GetAllProcess: async (_, __, context) => {
        const token = await context.auth()

        const data = await axios.get(`http://localhost:3004/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        console.log(data.data.data);
        errorHandler(data)

        return {
          statusCode: "200",
          data: data.data.data
        };
      }
    },

    Mutation: {
      UpdateEvent: async (_, args, context) => {
        const token = await context.auth()
        const { input } = args;

        // console.log(input, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        const data = await axios.put(`http://localhost:3004/`, { input }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        console.log(`okkkkkkkkkkkkkkkkkkkk mamankk`);
        errorHandler(data)

        return {
          statusCode: 200,
        };
      }
    }
  },
};
