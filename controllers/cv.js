const BooModel = require('./../models/Cv');
const UserModel = require('./../models/User');
const { verifyCv } = require('../validator/cv');

module.exports = {
    // requete POST / pour creer un Cv
    create: async (req, res) => {
        try {
            verifyCv(req.body); //Faire un verificateur
            const author = await UserModel.findById(req.body.author);
            if (!author) {
                res.status(400).send({
                    message: 'Author not exist'
                });
            }
            const newCv = new BooModel({
                visible: req.body.visible,
                description: req.body.description,
                author,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await newCv.save();
            const { _id, visible, description, createdAt } = newCv;
            res.status(201).send({
                id: _id,
                visible,
                description,
                createdAt,
                author: {
                    id: author._id,
                    firstname: author.firstname,
                    lastname: author.lastname
                }
            });
        } catch (error) {
            res.status(400).send({
                message: error.message || 'Something Wrong'
            });
        }
    },

    // requete GET / pour recuperer l'ensemble des Cv
    findAll: (req, res) => {
        BooModel.find()
            .then((cvs) => {
                res.send(cvs);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    },

    findOneById: (req, res) => {
        const cvId = req.params.id;
        BooModel.findById(cvId)
            .then((cv) => {
                res.send(cv);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot find book with id=${cvId}`);
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
