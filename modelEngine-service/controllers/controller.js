const { State, Event, DataLink, Process, sequelize } = require("../models");

class Controller {
  static async getAll(req, res, next) {
    try {
      const CompanyId = req?.loginInfo?.CompanyId;
      const processes = await Process.findAll({
        where: {
          CompanyId,
        },
      });
      res.status(200).json({
        statusCode: 200,
        data: processes,
      });
    } catch (error) {
      next({
        statusCode: 400,
        message: error.message,
      });
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const process = await Process.findByPk(id, {
        include: [
          { model: DataLink, as: "dataLinks" },
          { model: Event, as: "events" },
          { model: State, as: "states" },
        ],
      });
      res.status(200).json({
        statusCode: 200,
        data: process,
      });
    } catch (error) {
      next({
        statusCode: 400,
        message: error.message,
      });
    }
  }

  static async create(req, res, next) {
    const { models } = req.body;
    try {
      for (const modelSet of models) {
        modelSet.processName = modelSet.processName.split(" ").sort().join(" ");

        await sequelize.transaction(async (t) => {
          const [process] = await Process.upsert(
            {
              processName: modelSet.processName,
              identifier: `${modelSet.processName}-${req.loginInfo.CompanyId}`,
              description: "",
              lastUpdate: new Date(),
              fitness: 0,
              CompanyId: req.loginInfo.CompanyId,
            },
            {
              where: {
                identifier: `${modelSet.processName}-${req.loginInfo.CompanyId}`,
              },
              transaction: t,
              returning: true,
            }
          );

          const processId = process.id || process.dataValues.id;

          const states = modelSet.transitions.map((el) => ({
            eventName: el.key,
            isTextEditable: false,
            color: "#ADD8E7",
            shape: "Ellipse",
            ProcessId: processId,
            identifier: `${el.key}-${processId}`,
          }));

          for (const state of states) {
            await State.upsert(state, {
              where: {
                identifier: state.identifier
              },
              transaction: t
            })
          }

          const events = modelSet.places.map((el) => ({
            eventName: el.key,
            frequency: el.frequency,
            time: el.time,
            benchmarkTime: 0,
            ProcessId: processId,
            identifier: `${el.key}-${processId}`,
            isTextEditable: false,
            color: "#FF0099",
            shape: "Rounded rectangle",
          }));

          for (const event of events) {
            await Event.upsert(event, {
              where: {
                identifier: event.identifier
              },
              transaction: t
            })
          }

          const datalinks = modelSet.arcs.map((el) => ({
            from: el.from_,
            to: el.to,
            ProcessId: processId,
            identifier: `${el.from_}-${el.to}-${processId}`,
            text: "",
            canRelinkFrom: false,
          }));

          for (const link of datalinks) {
            await DataLink.upsert(link, {
              where: {
                identifier: link.identifier
              },
              transaction: t
            })
          }
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Processes created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const eventPaylaod = req.body.input
      for (const event of eventPaylaod) {
        await Event.update(
          {
            benchmarkTime: event.benchmarkTime,
          },
          {
            where: {
              identifier: event.identifier,
            },
          }
        );
      }
      res.status(200).json({
        statusCode: 200,
        message: "Process updated successfully",
      });
    } catch (error) {
      next({
        statusCode: 400,
        message: error.message,
      });
    }
  }
}

module.exports = Controller;
