const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.post("/login", Controller.login)

module.exports = router