const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Controller {
    static async postAnalytics(req, res, next){
        try {
            const { processName, caseId, timestamp, eventName, name, department, time, CompanyId } = req.body;

            const taskRecord = await prisma.task.create({
                data: {
                    processName,
                    caseId,
                    timestamp,
                    eventName,
                    name,
                    department,
                    time,
                    CompanyId
                }
            });

            res.status(201).json({ 
                statusCode: 201,
                message: 'Task created successfully', 
                data: taskRecord 
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = Controller;
