const { sequelize } = require('../models'); // Assuming you've exported sequelize from your models file
const { State, Event, DataLink, Process } = require('../models');

class Controller {
    static async getAll(req, res, next) {
        try {
            const CompanyId = req?.data?.CompanyId || 1;
            const processes = await Process.findAll({
                where: {
                    CompanyId
                }
            });
            res.status(200).json({
                statusCode: 200,
                data: processes
            });
        } catch (error) {
            console.log(error);
            next({
                statusCode: 400,
                message: error.message
            });
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id)
            const process = await Process.findByPk(id, {
                include: [
                    { model: DataLink, as: 'dataLinks' },
                    { model: Event, as: 'events' },
                    { model: State, as: 'states' }
                ]
            });
            res.status(200).json({
                statusCode: 200,
                data: process
            });
        } catch (error) {
            console.log(error);
            next({
                statusCode: 400,
                message: error.message
            });
        }
    }

    static async create(req, res, next) {
        let transaction;
        try {
            const { models } = req.body;
            const CompanyId = req?.data?.CompanyId;

            // Start a transaction
            console.log(`=== Transaction started ===`);
            transaction = await sequelize.transaction();
            for (const model of models) {
                let { processName, fitness, arcs, transitions, places } = model;

                processName = processName.split(", ").sort().join(", ");

                const processPayload = {
                    processName,
                    description: "This is a test process",
                    lastUpdate: new Date(),
                    fitness,
                    CompanyId,
                };

                const statePayload = transitions.map((transition) => ({
                    eventName: transition.key,
                    isTextEditable: false,
                    color: "#ADD8E6",
                    ProcessId: null, // Placeholder for later assignment
                }));

                const eventPayload = places.map((event) => ({
                    eventName: event.key,
                    frequency: event.frequency,
                    benchmarkTime: 0,
                    time: event.time,
                    isTextEditable: false,
                    color: "#FF0000",
                    ProcessId: null, // Placeholder for later assignment
                }));

                const dataLinkPayload = arcs.map((arc) => ({
                    canRelinkFrom: false,
                    from: arc.from_,
                    to: arc.to,
                    text: "",
                    ProcessId: null, // Placeholder for later assignment
                }));

                // Create or update the Process record
                const [upsertProcess, created] = await Process.upsert(processPayload, {
                    where: { processName, CompanyId },
                    transaction,
                });

                const ProcessId = upsertProcess.id;

                // Assign ProcessId to payloads
                statePayload.forEach(state => state.ProcessId = ProcessId);
                eventPayload.forEach(event => event.ProcessId = ProcessId);
                dataLinkPayload.forEach(dataLink => dataLink.ProcessId = ProcessId);

                // Perform bulk upsert operations
                await State.bulkCreate(statePayload, { transaction, updateOnDuplicate: ['eventName', 'ProcessId'] });
                await Event.bulkCreate(eventPayload, { transaction, updateOnDuplicate: ['eventName', 'ProcessId'] });
                await DataLink.bulkCreate(dataLinkPayload, { transaction, updateOnDuplicate: ['from', 'to', 'ProcessId'] });
            }

            // Commit the transaction if all operations succeed
            await transaction.commit();
            console.log(`=== Transaction committed ===`);
            res.status(200).json({
                statusCode: 200,
                data: "Success"
            });
        } catch (error) {
            // Rollback the transaction if any error occurs
            if (transaction) await transaction.rollback();

            console.error(error);
            next({
                statusCode: 400,
                message: error.message
            });
        }
    }
}


module.exports = Controller;
