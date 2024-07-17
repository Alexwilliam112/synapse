const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const Controller = require("../controllers/controller");
const { errorHandler } = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => { req.userSessionId },
});

router.use(authentication)

router.use(limiter);

router.post("/startminer", Controller.startMining);

router.use((req, res, next) => {
  const err = new Error(`Request Not Found. ( ${req.originalUrl} )`);
  err.status = 404;
  err.name = "ReqNotFound";
  next(err);
});

router.use(errorHandler);
module.exports = router;
