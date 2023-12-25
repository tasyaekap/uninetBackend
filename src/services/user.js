const userModel = require('../models/User');
require('dotenv').config()

exports.findUser = async (username) => {
    const res = await userModel.find({ username: username });
    return res
};

exports.register = async (data) => {
    const res = await userModel.create(data)
    return res
};