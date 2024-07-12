const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Api {
    static async getAll(req, res, next) {
        try {
            const { CompanyId } = req.data
            const allEndpoint = await prisma.endpoint.findMany({
                where: {
                    CompanyId
                }
            })
            console.log(allEndpoint);

            res.status(200).json({
                statusCode: 200,
                data: allEndpoint
            })
        } catch (error) {
            next({
                statusCode: 400
            });
        }
    }

    static async getById(req, res, next) {
        try {
            console.log(`ok`);
            const { id } = req.params
            const endpoint = await prisma.endpoint.findUnique({
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: endpoint
            })

        } catch (error) {
            next({
                statusCode: 400
            });
        }
    }

    static async create(req, res, next) {
        try {
            let { CompanyId } = req.data
            const { endpointUrl, status = "Completed", apiKey, description } = req.body;
            if (!endpointUrl || !status || !apiKey || !CompanyId || !description) {
                throw new Error("All data must be filled");
            }
            CompanyId = Number(CompanyId);
            const newApi = await prisma.endpoint.create({
                data: {
                    endpointUrl,
                    status,
                    apiKey,
                    CompanyId,
                    description
                }
            });
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

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { endpointUrl, apiKey, description } = req.body;
            const updatedData = await prisma.endpoint.update({
                where: {
                    id
                },
                data: {
                    endpointUrl,
                    apiKey,
                    description
                }
            });
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

