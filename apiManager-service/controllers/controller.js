const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Api {
    static async getAll(req, res, next) {
        try {
            const api = await prisma.Endpoint.findMany()
            console.log(api);
            res.status(200).json({
                msg: "ok"
            })
        } catch (error) {
            res.status(500).json({
                msg: error
            })
        }
    }

    static async create(req, res, next) {
        try {
            const { endpointUrl, status, CompanyId } = req.body
            const payload = { endpointUrl, status, CompanyId }

            res.status(201).json({
                msg: "Success Create Api"
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Api

