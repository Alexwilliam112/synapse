const express = require('express');
const Controller = require('../controllers/controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();

router.use(Authentication)
router.get('/', Controller.getAll);
router.post('/post', Controller.create);
router.get('/:id', Controller.getById);
router.put('/', Controller.update);

module.exports = router;