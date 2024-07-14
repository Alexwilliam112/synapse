const router = require("express").Router();
const Controller = require("../controllers/controller");
const { errorHandler } = require("../middlewares/errorHandler");

router.get("/startminer", Controller.startMining);

router.use((req, res, next) => {
  const err = new Error(`Request Not Found. ( ${req.originalUrl} )`);
  err.status = 404;
  err.name = "ReqNotFound";
  next(err);
});

router.use(errorHandler);
module.exports = router;
