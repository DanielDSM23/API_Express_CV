const bookModel = require('./../models/Book');
const mongoose = require('mongoose');

module.exports = {
    getUserInfos: (req, res) => {
        const { id, firstname, lastname, email } = req.user;
        res.send({
            id,
            firstname,
            lastname,
            email
        });
    },

    getUserBooks: async (req, res) => {
        const books = await bookModel
            .find({
                author: new mongoose.Types.ObjectId(req.user.id)
            })
            .populate('author');

        res.send(books);
    }
};
