const express = require('express');
const router = express.Router();


//middlewares
const { verifyToken, isAdmin }  = require("../middlewares/authJwt");

router.get('/admin', 
    verifyToken,
    isAdmin,

    (req, res, next) => {
        res.send("Admin content");
    }
);

router.get('/user',
    verifyToken,

    (req, res, next) => {
        res.send("User content");
    }
);

router.get('/all', (req, res, next) => {
        res.send("All access content");
    }
);

module.exports = router;
