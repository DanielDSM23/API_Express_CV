const CvModel = require('./../models/Cv');
const UserModel = require('./../models/User');
const EducationModel = require('./../models/Education');
const ProfessionalModel = require('./../models/Professional');
const { verifyCv } = require('../validator/cv');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

module.exports = {
    // requete POST / pour creer un Cv
    create: async (req, res) => {
        try {
            verifyCv(req.body);
            const author = req.user;
            if (!author) {
                res.status(400).send({
                    message: 'Author not exist'
                });
            }
            const newCv = new CvModel({
                visible: req.body.visible,
                description: req.body.description,
                author: author._id,
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
        CvModel.find({ visible: true })
            .then(async (cvs) => {
                let cvsWithUsers = [];
                for (i = 0; i < cvs.length; i++) {
                    const user = await UserModel.findById(cvs[i].author).lean();
                    delete user.password;
                    cvsWithUsers[i] = { ...cvs[i]._doc, author: user };
                }
                res.status(200).send(cvsWithUsers);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    },

    findOneById: (req, res) => {
        const cvId = req.params.id;
        CvModel.findById(cvId)
            .then(async (cv) => {
                const user = await UserModel.findById(cv.author).lean();
                delete user.password;
                const cvDetails = {
                    ...cv._doc,
                    education: await EducationModel.find({ cv: cv._id }),
                    profession: await ProfessionalModel.find({ cv: cv._id }),
                    author: user
                };
                res.send(cvDetails);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot find book with id=${cvId}`);
            });
    },

    // requete PUT /:id mettre a jour un cv
    update: async (req, res) => {
        try {
            const cvId = req.params.id;
            const cv = await CvModel.findById(cvId);
            if (!cv) {
                throw new Error('Cannot find cv to update');
            }
            //check user
            if (req.user._id.toString() !== cv.author.toString()) {
                res.status(403).send({});
                return;
            }
            const newCv = { ...cv._doc, ...req.body };
            const { author, description, visible } = newCv;
            CvModel.findByIdAndUpdate(
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
    delete: async (req, res) => {
        const cvId = req.params.id;
        const cv = await CvModel.findById(cvId);
        //check user
        if (req.user._id.toString() !== cv.author.toString()) {
            res.status(403).send({});
            return;
        }
        //delete ressources Edu and Professional
        CvModel.findByIdAndDelete(cvId)
            .then((cv) => {
                res.status(200).send({
                    message: `Book with id=${cvId} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete book with id=${cvId}`);
            });
    },

    getCvUser: (req, res) => {
        const userId = req.user._id.toString();
        CvModel.find({ author: userId })
            .then(async (cvs) => {
                if (cvs.length === 0) {
                    const newCv = new CvModel({
                        author: userId,
                        description: ' ',
                        visible: false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        education: [],
                        profession: []
                    });
                    await newCv.save();
                    res.status(200).send(newCv);
                } else {
                    const cvDetails = {
                        ...cvs[0]._doc,
                        education: await EducationModel.find({ cv: cvs[0]._id }),
                        profession: await ProfessionalModel.find({ cv: cvs[0]._id })
                    };
                    res.status(200).send(cvDetails);
                }
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot get cv with user id=${userId}`);
            });
    }
};
