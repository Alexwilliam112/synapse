const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.get('/getTableData', Controller.getTableData)
router.get('/getAnalytics', Controller.getAnalytics)
router.post('/upsert', Controller.postAnalytics)

module.exports = router