const config = require("../configs/auth.configs");
const User = require("../models/User");
const Role = require("../models/Role");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function signup (req, res) {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const userResult = user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find( {name: { $in: req.body.roles }},
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = roles.map(role => role._id);
                user.save(err => {
                
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                }
                res.send({ message: "User was registered successfully!" });
                });
            });
        } else {
            //Default role is "user"
            Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            user.roles = [role._id];
            user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.send({ message: "User was registered successfully!" });
            });
            });
        }
    });
};

function signin (req, res) {
    User.findOne( {username: req.body.username})
    .populate("roles", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400});
        let authorities = [];

        user.roles.forEach(role => {
            authorities.push("ROLE_" + role.name.toUpperCase());
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
};

module.exports = {
    signup: signup,
    signin: signin
}