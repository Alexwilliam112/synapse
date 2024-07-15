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

			console.log(`=== Transaction started ===`);


			for (const model of models) {
				let { processName, fitness, arcs, transitions, places } = model;

				processName = processName.split(", ").sort().join(", ");

				const processPayload = {
					processName,
					description: "This is a test lagi",
					lastUpdate: new Date().toISOString(),
					fitness,
					CompanyId,
					identifier: `${processName}-${CompanyId}`
				};

				transaction = await sequelize.transaction();
				let ProcessId
				await Process.bulkCreate([processPayload], {
					transaction,
					updateOnDuplicate: ["processName", 'identifier', 'description', 'lastUpdate', 'fitness', 'CompanyId'],
				}).then(result => {
					ProcessId = result[0].id;
					console.log(`process ${CompanyId} fine`);
				}).catch(error => {
					console.error(`process ${CompanyId} not fine`);
				});

				const statePayload = transitions.map((transition) => ({
					eventName: transition.key,
					isTextEditable: false,
					color: "#ADD8E7",
					ProcessId,
					identifier: `${transition.key}-${ProcessId}`
				}));

				const eventPayload = places.map((event) => ({
					eventName: event.key,
					frequency: event.frequency,
					benchmarkTime: 0,
					time: event.time,
					isTextEditable: false,
					color: "#FF0099",
					ProcessId,
					identifier: `${event.key}-${ProcessId}`
				}));

				const dataLinkPayload = arcs.map((arc) => ({
					canRelinkFrom: false,
					from: arc.from_,
					to: arc.to,
					text: "",
					ProcessId,
					identifier: `${arc.from_}-${arc.to}-${ProcessId}`

				}));

				// bulk insert state, event, and dataLink
				await State.bulkCreate(statePayload, {
					transaction,
					updateOnDuplicate: ['identifier', 'eventName', 'isTextEditable', 'color', 'ProcessId']
				}).then(result => {
					console.log(`state ${ProcessId} fine`);
				}).catch(error => {
					console.error(`state ${ProcessId} not fine ${error.parent.hint}`);
				});

				await Event.bulkCreate(eventPayload, {
					transaction,
					updateOnDuplicate: ['identifier', 'eventName', 'frequency', 'benchmarkTime', 'time', 'isTextEditable', 'color', 'ProcessId']
				}).then(result => {
					console.log(`event ${ProcessId} fine`);
				}).catch(error => {
					console.error(`event ${ProcessId} not fine ${error.parent.hint}`);
				});

				await DataLink.bulkCreate(dataLinkPayload, {
					transaction,
					updateOnDuplicate: ['identifier', 'canRelinkFrom', 'from', 'to', 'text', 'ProcessId']
				}).then(result => {
					console.log(`dataLink ${ProcessId} fine`);
				}).catch(error => {
					console.error(`dataLink ${ProcessId} not fine ${JSON.stringify(error)}`);
				});

				await transaction.commit();
			}
			console.log(`=== Transaction committed ===`);
			res.status(200).json({
				statusCode: 200,
				data: "Success"
			});
		} catch (error) {
			if (transaction) await transaction.rollback();

			console.error(error);
			next({
				statusCode: 400,
				message: error.message
			});
		}
	}


	// // Alternative implementation
	// static async create(req, res, next) {
	// 	let transaction;
	// 	try {
	// 		const { models } = req.body;
	// 		const CompanyId = req?.data?.CompanyId;

	// 		console.log(`=== Transaction started ===`);

	// 		for (const model of models) {
	// 			let { processName, fitness, arcs, transitions, places } = model;

	// 			processName = processName.split(", ").sort().join(", ");

	// 			const processPayload = {
	// 				processName,
	// 				description: "This is a test lagi",
	// 				lastUpdate: new Date().toISOString(),
	// 				fitness,
	// 				CompanyId,
	// 				identifier: `${processName}-${CompanyId}`
	// 			};

	// 			transaction = await sequelize.transaction();
	// 			let ProcessId;

	// 			const maxRetries = 3;

	// 			let attempt = 0;

	// 			while (attempt < maxRetries) {
	// 				try {
	// 					const process = await Process.bulkCreate([processPayload], {
	// 						transaction,
	// 						updateOnDuplicate: ["processName", 'identifier', 'description', 'lastUpdate', 'fitness', 'CompanyId'],
	// 					});
	// 					ProcessId = process[0].id;

	// 					const statePayload = transitions.map((transition) => ({
	// 						eventName: transition.key,
	// 						isTextEditable: false,
	// 						color: "#ADD8E7",
	// 						ProcessId,
	// 						identifier: `${transition.key}-${ProcessId}`
	// 					}));

	// 					const eventPayload = places.map((event) => ({
	// 						eventName: event.key,
	// 						frequency: event.frequency,
	// 						benchmarkTime: 0,
	// 						time: event.time,
	// 						isTextEditable: false,
	// 						color: "#FF0099",
	// 						ProcessId,
	// 						identifier: `${event.key}-${ProcessId}`
	// 					}));

	// 					const dataLinkPayload = arcs.map((arc) => ({
	// 						canRelinkFrom: false,
	// 						from: arc.from_,
	// 						to: arc.to,
	// 						text: "",
	// 						ProcessId,
	// 						identifier: `${arc.from_}-${arc.to}-${ProcessId}`
	// 					}));

	// 					await State.bulkCreate(statePayload, {
	// 						transaction,
	// 						updateOnDuplicate: ['identifier', 'eventName', 'isTextEditable', 'color', 'ProcessId']
	// 					})
	// 						.then(result => {
	// 							console.log(`state ${ProcessId} fine`);
	// 						}).catch(error => {
	// 							console.error(`state ${ProcessId} not fine`);
	// 							throw error;
	// 						});

	// 					await Event.bulkCreate(eventPayload, {
	// 						transaction,
	// 						updateOnDuplicate: ['identifier', 'eventName', 'frequency', 'benchmarkTime', 'time', 'isTextEditable', 'color', 'ProcessId']
	// 					})
	// 						.then(result => {
	// 							console.log(`event ${ProcessId} fine`);
	// 						}).catch(error => {
	// 							console.error(`event ${ProcessId} not fine`);
	// 							throw error;
	// 						});

	// 					await DataLink.bulkCreate(dataLinkPayload, {
	// 						transaction,
	// 						updateOnDuplicate: ['identifier', 'canRelinkFrom', 'from', 'to', 'text', 'ProcessId']
	// 					})
	// 						.then(result => {
	// 							console.log(`dataLink ${ProcessId} fine`);
	// 						}).catch(error => {
	// 							console.error(`dataLink ${ProcessId} not fine`);
	// 							throw error;
	// 						});

	// 					break;
	// 				} catch (error) {
	// 					attempt++;
	// 					console.error(`Attempt ${attempt} failed: ${error.message}`);
	// 					if (attempt >= maxRetries) {
	// 						// Handle max retries reached, e.g., rollback transaction or log error
	// 						await transaction.rollback();
	// 						throw new Error(`Operation failed after ${maxRetries} attempts`);
	// 					}
	// 					// Optional: Delay before retrying
	// 					await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
	// 				}
	// 			}

	// 		}
	// 		await transaction.commit();
	// 		console.log(`=== Transaction committed ===`);
	// 		res.status(200).json({
	// 			statusCode: 200,
	// 			data: "Success"
	// 		});
	// 	} catch (error) {
	// 		if (transaction) await transaction.rollback();

	// 		console.error(error);
	// 		next({
	// 			statusCode: 400,
	// 			message: error.message
	// 		});
	// 	}
	// }
}

module.exports = Controller;
