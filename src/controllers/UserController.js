
async function createUser(req, res, next) {
    const User = require('../models/User')

    try {
        // Create a User
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // Save Tutorial in the database
        let response = await user.save(user);
        res.send(response);
    } catch(error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the User."
        });
    }
};

async function getById(req, res, next) {
    const id = req.params.id;
    const User = require('../models/User')


    try {
        const userData = await User.findById(id);

        if (!userData) {
            res.status(404).send({ message: `Not found User with id ${id}`});
        } else {
            res.send(userData);
        }
    } catch(error) {
        res.status(500).send({ message: "Error retrieving User with id=" + id });
    };
}

module.exports= {
    createUser: createUser,
    getById: getById
}