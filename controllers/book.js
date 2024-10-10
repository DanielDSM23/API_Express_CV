const BooModel = require('./../models/Book');
const UserModel = require('./../models/User');
const { verifyBook } = require('../validator/book');

module.exports = {
    // requete POST / pour creer un Book
    create: async (req, res) => {
        try {
            verifyBook(req.body);
            const author = await UserModel.findById(req.body.author);
            if (!author) {
                res.status(400).send({
                    message: 'Author not exist'
                });
            }
            const newBook = new BooModel({
                name: req.body.name,
                description: req.body.description,
                author
            });
            newBook.save();
            const { _id, name, description, author: authorBook } = newBook;
            res.status(201).send({
                id: _id,
                name,
                description,
                author: {
                    id: authorBook._id,
                    firstname: authorBook.firstname,
                    lastname: authorBook.lastname
                }
            });
        } catch (error) {
            res.status(400).send({
                message: error.message || 'Something Wrong'
            });
        }
    },

    // requete GET / pour recuperer l'ensemble des books
    findAll: (req, res) => {
        BooModel.find()
            .then((books) => {
                res.send(books);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    },

    // requete GET /:id pour récupere un book
    findBook: (req, res) => {
        const bookId = req.params.id;
        BooModel.findById(bookId)
            .then((book) => {
                res.send(book);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot find book with id=${bookId}`);
            });
    },

    // requete PUT /:id mettre a jour un book
    updateBook: async (req, res) => {
        const bookId = req.params.id;
        const book = await BooModel.findById(bookId);
        if (!book) {
            throw new Error('Cannot find book to update');
        }
        const newBook = { ...book, ...req.body };

        verifyBook(newBook);
        const { name, description } = newBook;
        BooModel.findByIdAndUpdate(
            bookId,
            {
                name,
                description
            },
            { new: true }
        )
            .then((updateBook) => {
                res.send(updateBook);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot update book with id=${bookId}`);
            });
    },

    // requete DELETE /:id Supprimer un book
    deleteBook: (req, res) => {
        const bookId = req.params.id;
        BooModel.findByIdAndDelete(bookId)
            .then((book) => {
                res.send({
                    message: `Book with id=${book.id} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete book with id=${bookId}`);
            });
    }
};
