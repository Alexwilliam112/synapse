const router = require('express').Router()
const Controller = require('../controllers/Controller')
const { authentication } = require('../middlewares/authentication');
const errorHandler = require("../middlewares/errorHandler");

router.use(authentication)
router.post("/login", Controller.login)
router.post("/findUser", Controller.findUser)
router.use(errorHandler)

module.exports = router