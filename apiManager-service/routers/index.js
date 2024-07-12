const express = require('express')
const Api = require('../controllers/controller')
const router = express.Router()

router.get("/api", Api.getAll)
router.post("/api", Api.create)

module.exports = router
