const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/UserController');

router.get('/:id', UserControllers.getById);
router.post('/', UserControllers.createUser);

module.exports = router;
