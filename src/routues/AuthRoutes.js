const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/AuthController');

//middlewares
const { verifyDuplicateUsernameOrEmail, checkRolesExisted } = require("../middlewares/verifySignup");


router.post('/signin', AuthControllers.signin);

router.post('/signup', 
    verifyDuplicateUsernameOrEmail,
    checkRolesExisted,
    AuthControllers.signup);

module.exports = router;
