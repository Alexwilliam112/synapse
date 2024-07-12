const { PrismaClient } = require("@prisma/client");
const { compareSync } = require("../utils/bcrypt");
const { verifyToken } = require("../utils/jwt");

const prisma = new PrismaClient();

class Controller {
  static async login(req, res, next) {
    try {
      const bodyToken = req.body.body;

      const { Authorization } = req.body.headers
      
      const authToken = Authorization.split(" ")[1]

      if (!bodyToken || !authToken) throw { name: "Invalid" };

      const bodyDecoded = verifyToken(bodyToken);
      
      const authDecoded = verifyToken(authToken);

      if (authDecoded.origin !== process.env.USER_ORIGIN) throw { name: "Invalid" }

      const { email, password } = bodyDecoded;
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
      const bodyToken = req.body.body;
      
      const { Authorization } = req.body.headers
      const authToken = Authorization.split(" ")[1]
      
      if (!bodyToken || !authToken) throw { name: "Invalid" };
      
      const bodyDecoded = verifyToken(bodyToken.email);
      const authDecoded = verifyToken(authToken);
      
      const email = bodyDecoded;

      if (authDecoded.origin !== process.env.USER_ORIGIN) throw { name: "Invalid" }
      if (!email) throw { name: "Invalid" };
  
      const user = await prisma.user.findUnique({
        where: { email },
        include: { company: true },
      });

      if (!user) throw { name: "Invalid" };

      res.status(200).json({
        statusCode: 200,
        data: {
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
