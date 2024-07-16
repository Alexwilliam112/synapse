const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class ModelEngine {
  static async getAll(req, res, next) {
    try {
      const { CompanyId } = req.data
      const process = await prisma.process.findMany({
        where: {
          CompanyId
        }
      })
      res.status(200).json({
        statusCode: 200,
        data: process
      })
    } catch (error) {
      next({
        statusCode: 400
      });
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params
      const process = await prisma.process.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          dataLinks: true,
          events: true,
          states: true
        }
      });
      res.status(200).json({
        statusCode: 200,
        data: process
      })
    } catch (error) {
      console.log(error);
      next({
        statusCode: 400
      });
    }
  }

  static async create(req, res, next) {
    try {
      console.log(req.data);
      const { models } = req.body;
      const CompanyId = req?.data?.CompanyId || 1
      for (const model of models) {
        let { processName, fitness, arcs, transitions, places } = model;

        processName = processName.split(", ").sort().join(", ");

        const processPayload = {
          processName,
          description: "This is a test process",
          lastUpdate: new Date(),
          fitness,
          CompanyId,
          identifier: `${processName}-${CompanyId}`
        };

        const statePayload = transitions.map((transition) => ({
          eventName: transition.key,
          isTextEditable: false,
          color: "#ADD8E6",
        }));

        const eventPayload = places.map((event) => ({
          eventName: event.key,
          frequency: event.frequency,
          benchmarkTime: 0,
          time: event.time,
          isTextEditable: false,
          color: "#FF0000",
        }));

        const dataLinkPayload = arcs.map((arc) => ({
          canRelinkFrom: false,
          from: arc.from_,
          to: arc.to,
          text: "",
        }));

        // Process
        const checkProcess = await prisma.process.findFirst({
          where: {
            processName,
            CompanyId: processPayload.CompanyId
          }
        });

        const upsertProcess = await prisma.process.upsert({
          where: {
            id: checkProcess?.id || 0
          },
          update: processPayload,
          create: processPayload
        });

        const ProcessId = upsertProcess.id;

        // Payload
        const states = statePayload.map((state) => ({
          ...state,
          ProcessId,
          identifier: `${state.eventName}-${ProcessId}`

        }));

        const events = eventPayload.map((event) => ({
          ...event,
          ProcessId,
          identifier: `${event.eventName}-${ProcessId}`
        }));

        const dataLinks = dataLinkPayload.map((dataLink) => ({
          ...dataLink,
          ProcessId,
          identifier: `${dataLink.from_}-${dataLink.to}-${ProcessId}`
        }));

        if (upsertProcess) {
          await upsert({ ProcessId, states, events, dataLinks })
        }
      }

      res.status(200).json({
        statusCode: 200,
        data: "Success"
      });
    } catch (error) {
      console.log(error);
      next({
        statusCode: 400
      });
    }
  }
}

async function upsert({ ProcessId, states, events, dataLinks }) {
  try {
    // await prisma.$transaction(async (prisma) => {
    // State
    for (const state of states) {
      const checkState = await prisma.state.findFirst({
        where: {
          eventName: state.eventName,
          ProcessId
        }
      });

      await prisma.state.upsert({
        where: {
          id: checkState?.id || 0
        },
        update: state,
        create: state
      });
    }

    // Event
    for (const event of events) {
      const checkEvent = await prisma.event.findFirst({
        where: {
          eventName: event.eventName,
          ProcessId
        }
      });

      await prisma.event.upsert({
        where: {
          id: checkEvent?.id || 0
        },
        update: event,
        create: event
      });
    }

    // DataLink
    for (const dataLink of dataLinks) {
      const checkDataLink = await prisma.dataLink.findFirst({
        where: {
          from: dataLink.from,
          to: dataLink.to,
          ProcessId
        }
      });

      await prisma.dataLink.upsert({
        where: {
          id: checkDataLink?.id || 0
        },
        update: dataLink,
        create: dataLink
      });
    }
    console.log(ProcessId, "ok");
    // });

  } catch (error) {
    console.log(">>>>>>>>>>>>>>> \n", error, `\n <<<<<<<<<<<<<<<<<<<<<ini err`);
  }
}

module.exports = ModelEngine