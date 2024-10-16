const jwt = require('jsonwebtoken');
const UserModel = require('./../models/User');
const res = require('express/lib/response');

module.exports = {
    verifyUser: async (req, res, next) => {
        try {
            let token = req.headers['authorization'];
            if (!token) {
                res.status(401).send({
                    message: 'Unauthorized user'
                });
                return;
            }
            token = token.replace('Bearer ', '');
            const { userId } = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            const user = await UserModel.findById(userId);
            req.user = user;
            if (!req.user) {
                res.status(401).send({
                    message: 'Unauthorized user'
                });
            }

            next();
        } catch (error) {
            res.status(401).send({
                message: 'Unauthorized user'
            });
        }
    }
};
