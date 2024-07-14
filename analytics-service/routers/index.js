const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.post("/upsert", Controller.postAnalytics)

module.exports = router