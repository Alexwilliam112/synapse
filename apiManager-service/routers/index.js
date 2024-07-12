const express = require('express')
const Api = require('../controllers/controller')
const verify = require('../middleware/verify')
const router = express.Router()

router.use(verify)

router.get("/api", Api.getAll)
router.get("/api/:id", Api.getById)
router.post("/api", Api.create)

module.exports = router
