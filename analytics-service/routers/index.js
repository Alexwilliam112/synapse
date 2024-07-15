const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.get('/getTableData', Controller.getTableData)
router.get('/getChartData', Controller.getChartData)
router.post('/upsert', Controller.postAnalytics)

module.exports = router