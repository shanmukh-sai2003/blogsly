const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateAccessToken = (user) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY, {expiresIn: '2m'});
    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader) {
        return res.status(403).json({success: false, message: "user is unauthorized! please login"});
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
        if(err) {
            const response = {
                success: false,
                message: "Not valid user! please login"
            };
            return res.status(403).json(response);
        }

        req.user = decoded;
        next();
    });
}