const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Controller {
  static async getUserByEmail(req, res, next) {
    try {
      const userEmail = req.params.email;

      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { company: true },
      });

      if (!user) throw { name: "UserNotFound" };

      res.status(200).json({
        message: "Success read users",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;