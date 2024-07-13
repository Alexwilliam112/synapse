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
            res.status(200).json({
                statusCode: 200,
                data: "Success Get Data By Id"
            })
        } catch (error) {
            next({
                statusCode: 400
            });
        }
    }
}

module.exports = ModelEngine