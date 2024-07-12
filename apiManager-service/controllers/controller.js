const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Api {
    static async getAll(req, res, next) {
        try {
            const { CompanyId } = req.data
            const allEndpoint = await prisma.Endpoint.findMany({
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
            const { id } = req.params
            const endpoint = await prisma.Endpoint.findUnique({
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
            const { endpointUrl, status, apiKey, description } = req.body;
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

