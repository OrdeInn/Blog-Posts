function UserService() {
    const User = require('../models/User')

    this.createUser = async function (userRequest) {
        const result = {
            error:false
        };
        
        try {
            const user = new User({
                username: userRequest.username,
                email: userRequest.email,
                password: userRequest.password
            });
            result.obj = await user.save();
        
        } catch(error) {
            result.error = true;
            result.errorMsg = error.message || "Some error occurred while creating the User";
        }

        return result;
    };

    this.getUserById = async function(userId) {
        const result = {
            error: false
        };

        try {
            const userData = await User.findById(userId);
    
            if (!userData) {
                result.error = true;
                result.errorMsg = `Not found User with id ${userId}`;
                result.statusCode = 404;
            } else {
                result.obj = userData;
            }
        } catch(error) {
            result.error = true;
            result.errorMsg = `Error retrieving User with id: ${id}`;
        };

        return result;
    };
};


module.exports = new UserService();