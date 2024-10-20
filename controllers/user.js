const mongoose = require('mongoose');
const UserModel = require('../models/User');

module.exports = {
    getUserInfos: (req, res) => {
        const { id, firstname, lastname, email, description } = req.user;
        res.send({
            id,
            firstname,
            lastname,
            email,
            description
        });
    },

    updateUser: (req, res) => {
        try {
            const idUser = req.user._id.toString();
            const user = UserModel.findById(idUser);

            const newUser = { ...user, ...req.body };

            const { firstname, lastname, description } = newUser;

            UserModel.findByIdAndUpdate(
                idUser,
                {
                    firstname: firstname,
                    lastname: lastname,
                    description: description
                },
                { new: true }
            )
                .then((updateUser) => {
                    res.send(updateUser);
                })
                .catch((error) => {
                    res.status(500).send(error.message || `Cannot update user with id=${cvId}`);
                });
        } catch (error) {
            res.status(500).send({});
        }
    }
};
