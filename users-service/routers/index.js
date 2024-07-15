const router = require('express').Router()
const Controller = require('../controllers/Controller')
const { authentication } = require('../middlewares/authentication');
const errorHandler = require("../middlewares/errorHandler");

router.use(authentication)
//for login process, logic, and client token made at orchestrator
router.post("/login", Controller.login)
//find user for authentication process at orchestrator
router.post("/findUser", Controller.findUser)
router.use(errorHandler)

module.exports = router