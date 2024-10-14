const BooModel = require('../models/Professional');
const CvModel = require('../models/CvModel');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const { verifyProfessional } = require('../validator/professional');

module.exports = {
    // requete POST / pour creer une experience
    create: async (req, res) => {
        try {
            verifyProfessional(req.body);
            //chercher le user selon le cv
            const cv = await CvModel.findById(req.body.cv);
            if (req.user !== cv.author) {
                res.status(403).send({});
            }
            const author = await UserModel.findById(cv.author);
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

    // requete PUT /:id mettre a jour un cv
    update: async (req, res) => {
        try {
            const cvId = req.params.id;
            const cv = await BooModel.findById(cvId);
            if (!cv) {
                throw new Error('Cannot find cv to update');
            }
            //check user
            if (req.user !== cv.author) {
                res.status(403).send({});
            }
            const newCv = { ...cv._doc, ...req.body };
            const { author, description, visible } = newCv;
            BooModel.findByIdAndUpdate(
                cvId,
                {
                    author,
                    description,
                    visible,
                    updatedAt: new Date()
                },
                { new: true }
            )
                .then((updateCv) => {
                    res.send(updateCv);
                })
                .catch((error) => {
                    res.status(500).send(error.message || `Cannot update cv with id=${cvId}`);
                });
        } catch (error) {
            res.status(500).send({});
        }
    },

    // requete DELETE /:id Supprimer un book
    deleteBook: (req, res) => {
        const cvId = req.params.id;
        const cv = BooModel.findById(cvId);
        //check user
        if (req.user !== cv.author) {
            res.status(403).send({});
        }
        //delete ressources Edu and Professional
        BooModel.findByIdAndDelete(cvId)
            .then((cv) => {
                res.send({
                    message: `Book with id=${cv.id} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete book with id=${cvId}`);
            });
    }
};
