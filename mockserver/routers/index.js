'use strict'
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const { errorHandler } = require('../middlewares/errorHandler')
const MainController = require('../controllers/mainController.js')

router.use(authentication)

router.get('/eventlog', MainController.read)

router.use(errorHandler)

module.exports = router