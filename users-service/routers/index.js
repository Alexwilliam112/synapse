const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.post("/login", Controller.login)

router.post("/findUser", Controller.findUser)

module.exports = router