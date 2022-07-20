const jwt = require('jsonwebtoken');
const account = require('../models/account');
const db = require('../configs/config-mysql');
require('dotenv').config();
const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(401).send({ error: 'Not authorized to access this resource' });
        } else {
            console.log(authData);
            next();
        }
    });
};
module.exports = auth;
