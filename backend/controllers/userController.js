const User = require('../models/user');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const authController = require('./authController');

exports.userLogin = [
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const response = {
                success: false,
                errors: errors.array(),
            };
            return res.status(400).json(response);
        }

        try {
            const uname = req.body.username;
            const pwd = req.body.password;
            const user = await User.findOne({username: uname});
            if(!user) {
                return res.status(401).json({success: false, message: "No user found with the username"});
            }

            const match = await bcrypt.compare(pwd, user.password);
            if(!match) {
                return res.status(401).json({success: false, message: "invalid password"});
            }

            const userPayload = {
                name: user.name,
                username: user.username,
                userId: user._id
            };

            const accessToken = authController.generateAccessToken(userPayload);
            const response = {
                ...userPayload,
                accessToken: accessToken,
                success: true
            };

            res.status(200).json(response);
        } catch (error) {
            const response = {
                success: false,
                message: error.message()
            };
            res.status(400).json(response);
        }
    }
];

