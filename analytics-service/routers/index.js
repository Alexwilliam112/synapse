const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.post("/analytics", Controller.postAnalytics)

module.exports = router