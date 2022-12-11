const ROLES = require("../models/ROLES");
const User = require("../models/User");


verifyDuplicateUsernameOrEmail = (req, res, next) => {
    User
    .findOne({ username: req.body.username})
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err});
            return;
        }

        if (user) {
            res.status(400).send( {message: "Username is already in use."})
            return;
        }

        User
        .findOne({ email: req.body.email})
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err});
                return;
            }
    
            if (user) {
                res.status(400).send( {message: "Email is already in use."})
                return;
            }
        });

        next();
    });
}