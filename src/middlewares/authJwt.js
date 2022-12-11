const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
const User = require("../models/User");
const Role = require("../models/Role");

verifyToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
    } else {
        return res.status(403).send({ message: "Auth token is missing!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
};

isAdmin = (req, res, next) => {
    User
    .findById(req.userId)
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            
            return;
        }

        Role.find(
        {
            _id: { $in: user.roles }
        },
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                
                return;
            }

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    
                    return;
                }
            }

            res.status(403).send({ message: "Require Admin Role!" });
            return;
        }
        );
    });
};

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}