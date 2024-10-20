const UserModel = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyUser } = require('../validator/user');

module.exports = {
    // POST /register Creer un utilisateur
    register: async (req, res) => {
        try {
            verifyUser(req.body);
            const { firstname, lastname, email, password, description } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                firstname,
                lastname,
                description,
                email, // email: email
                password: hash
            });

            newUser.save();
            res.status(201).send({
                id: newUser._id,
                lastname: newUser.lastname,
                firstname: newUser.firstname,
                description: newUser.description,
                email: newUser.email
            });
        } catch (error) {
            res.send({
                message: error.message || 'Cannot register User'
            });
        }
    },

    // POST /login Authentification
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({
                email // email: email
            });

            if (!user) {
                res.status(401).send({
                    message: 'User not exist'
                });
                return;
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (checkPassword) {
                const jwtOptions = {
                    expiresIn: process.env.JWT_TIMOEOUTE_DURATION || '1h'
                };
                const secret = process.env.JWT_SECRET || 'secret';

                const token = jwt.sign(
                    {
                        userId: user.id
                    },
                    secret,
                    jwtOptions
                );

                res.send({
                    message: 'Login successfully',
                    user: {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        token
                    }
                });
            } else {
                res.status(401).send({
                    messsage: 'Wrong login informations'
                });
            }
        } catch (error) {
            res.status(500).send({ message: 'Unable to login' });
        }
    },
    //get
    userDetails: async (req, res) => {
        const id = req.params.id;
        UserModel.findById(id).then((user) => {
            res.status(200).send({ firstname: user.firstname, lastname: user.lastname, email: user.email });
        });
    }
};
