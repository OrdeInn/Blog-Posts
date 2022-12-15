const UserService = require('../services/UserService');

async function createUser(req, res, next) {
    const userResult = await UserService.createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    if (userResult.error) {
        res.status(500).send( {message: userResult.errorMsg} );
        return;
    }

    res.send(userResult.obj);
    next();
};

async function getById(req, res, next) {
    const id = req.params.id;

    const userResult = await UserService.getUserById(id);

    if (userResult.error) {
        if (userResult.statusCode) {
            res.status(userResult.statusCode);
        } else {
            res.status(500);
        }
        res.send( {message: userResult.errorMsg} );
        return;
    }

    res.send(userResult.obj);
    next();
}

module.exports= {
    createUser: createUser,
    getById: getById
}