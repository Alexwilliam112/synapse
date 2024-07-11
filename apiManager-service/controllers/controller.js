

// const prisma = new

class Api {
    static async getAll(req, res, next) {
        try {
            res.status(200).json({
                msg: "ok"
            })
        } catch (error) {
            console.log(error);
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

