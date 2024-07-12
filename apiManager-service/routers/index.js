const express = require('express')
const Api = require('../controllers/controller')
const verify = require('../middleware/verify')
const router = express.Router()

router.use(verify)

router.get("/api", Api.getAll)
router.get("/api/:id", Api.getById)
router.post("/api/:id", Api.create)
router.put("/api/:id", Api.update)
router.delete("/api/:id", Api.delete)

module.exports = router
