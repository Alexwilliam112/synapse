const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Api {
    static async getAll(req, res, next) {
        try {
            const allEndpoint = await prisma.Endpoint.findMany()
            res.status(200).json({
                statusCode: 200,
                data: allEndpoint
            })
        } catch (error) {
            res.status(400).json({
                statusCode: 400,
                message: "bad request"
            })
        }
    }

    static async create(req, res, next) {
        try {
            let { endpointUrl, status, apiKey, CompanyId, description } = req.body;
            if (!endpointUrl || !status || !apiKey || !CompanyId || !description) {
                throw new Error("All data must be filled");
            }
            CompanyId = Number(CompanyId);
            const newApi = await prisma.Endpoint.create({
                data: {
                    endpointUrl,
                    status,
                    apiKey,
                    CompanyId,
                    description
                }
            });
            console.log(newApi);
            res.status(201).json({
                statusCode: 200,
                message: "Success Create Api"
            });
        } catch (error) {
            next({
                statusCode: 400
            });
        }
    }

}

module.exports = Api

