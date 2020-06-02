const User = require('../schema/user-schema');

exports.save = (userData) => {
    let user = new User(userData);
    return user.save();
};

exports.auth = (userData) => {
    console.log(userData);
    return User.find(userData).lean();
};