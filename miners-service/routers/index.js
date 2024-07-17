const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const Controller = require("../controllers/controller");
const { errorHandler } = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  keyGenerator: function (req) {
    return req.userSessionId;
  },
  handler: function (req, res, next) {
    res.status(429).json({
      message: "Too many requests, please try again in a minute.",
    })
  },
  skip: function (req, res) {
    return res.status < 200 || res.status >= 300
  }
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
