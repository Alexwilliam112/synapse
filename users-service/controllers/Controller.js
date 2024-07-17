const { PrismaClient } = require("@prisma/client");
const { compareSync } = require("../utils/bcrypt");

const prisma = new PrismaClient();

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.bodyDecoded;
      if (!email || !password) throw { name: "Invalid" }

      const user = await prisma.user.findUnique({
        where: { email },
        include: { company: true },
      });

      if (!user) throw { name: "Invalid" };

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) throw { name: "Invalid" };

      res.status(200).json({
        statusCode: 200,
        data: {
          email: user.email,
          companyName: user.company.companyName,
        },
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async findUser(req, res, next) {
    try {
      const email = req.bodyDecoded;

      if (!email) throw { name: "Invalid" };

      const user = await prisma.user.findUnique({
        where: { email },
        include: { company: true },
      });

      if (!user) throw { name: "Invalid" };

      res.status(200).json({
        statusCode: 200,
        data: {
          id: user.id,
          email: user.email,
          CompanyId: user.CompanyId,
          companyName: user.company.companyName,
        },
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

module.exports = Controller;
