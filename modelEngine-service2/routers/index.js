const express = require('express');
const Controller = require('../controllers/controller');
const verify = require('../middleware/verify');

const router = express.Router();

// Define your routes here
router.use(verify)

router.get('/', Controller.getAll);
router.post('/post', Controller.create);
router.get('/:id', Controller.getById);

// Export the router
module.exports = router;