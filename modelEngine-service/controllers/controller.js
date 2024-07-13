
class ModelEngine {
    static async getAll(req, res, next) {
        try {
            res.status(200).json({
                statusCode: 200,
                data: "Success Get All Data"
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