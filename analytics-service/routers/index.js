const router = require('express').Router()
const Controller = require('../controllers/Controller')
const authentication = require('../middlewares/authentication');
const errorHandler = require("../middlewares/errorHandler");

// router.use(authentication)
router.get('/getTableData', Controller.getTableData)
router.get('/getChartData', Controller.getChartData)
router.post('/upsert', Controller.postAnalytics)
router.use(errorHandler)

module.exports = router