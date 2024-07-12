const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Controller {
    static async postAnalytics(req, res, next){
        try {
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Controller