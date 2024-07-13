const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class ModelEngine {
    static async getAll(req, res, next) {
        try {
            // const { CompanyId } = req.data
            const CompanyId = 1
            const process = await prisma.process.findMany({
                where: {
                    CompanyId
                }
            })
            console.log(process);
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
}

module.exports = ModelEngine