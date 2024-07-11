const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.get("/users/:email", Controller.getUserByEmail)

module.exports = router