const express = require('express')
const ModelEngine = require('../controllers/controller')
const verify = require('../middleware/verify')
const router = express.Router()

router.use(verify)

router.get("/", ModelEngine.getAll)
router.get("/:id", ModelEngine.getById)

module.exports = router
