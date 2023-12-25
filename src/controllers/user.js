const userService = require('../services/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.registerUser = async (req, res) => {
    try {
        data = req.body
        console.log(data)
        let isExist = await userService.findUser(data.username)
        console.log(isExist.length > 1)
        if (isExist.length > 1){
            res.status(500).json({ error: 'Username already registered' });
        }

        data.password = await bcrypt.hashSync(data.password, 10);

        const reg = await userService.register(data);
        console.log(reg)
        if(reg._id){
            res.status(200).json({ message: 'User sucess registered' });
        }
    } catch (err) {
        return {
            error: true,
            code: 500,
            message: 'User failed to registered'
        }
    }
};

exports.login = async (req, res) => {
    try {
        data = req.body
        let user = await userService.findUser(data.username)
        if (user.length < 1) {
            res.status(401).json({ message: 'The username you entered is not registered.'});
        }

        user = user[0];

        const match = await bcrypt.compare(data.password, user.password || '');

        if (match) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '10h',
            });

            res.status(200).json({ data: token});
        } else {
            res.status(401).json({ message: 'Your username or password is not valid. Please try again to Sign In.'});
        }
    } catch (err) {
        return {
            error: true,
            code: 500,
            message: 'Failed to login'
        }
    }
};