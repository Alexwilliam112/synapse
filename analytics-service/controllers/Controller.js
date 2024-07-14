const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Controller {
    static async postAnalytics(req, res, next) {
        try {
            let tasks = req.body.tasks;

            console.log(tasks)

            if (!Array.isArray(tasks) || tasks.length === 0) throw { name: 'Invalid' }

            tasks = tasks.map(task => ({
                ...task,
                timestamp: new Date(task.timestamp).toISOString(),
                time: parseFloat(task.time),
                CompanyId: parseFloat(task.CompanyId)
            }));

            const taskRecords = await prisma.task.createMany({
                data: tasks
            });

            res.status(201).json({ 
                statusCode: 201,
                message: 'Tasks created successfully', 
                data: taskRecords 
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

module.exports = Controller;
