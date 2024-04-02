const express = require('express');
const router = express.Router();


const userProductController = require('../controllers/user.products.controller');

router.get('/', userProductController.findAll);
router.get('/:username', userProductController.findOne);
router.post('/', userProductController.create);

module.exports = router;