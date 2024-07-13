const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Controller {
    static async postAnalytics(req, res, next){
        try {
            let { processName, caseId, timestamp, eventName, name, department, time, CompanyId } = req.body;
            time = parseFloat(time)
            CompanyId = parseFloat(CompanyId)

            const taskRecord = await prisma.task.createMany({
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
