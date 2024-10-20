const EduModel = require('../models/Education');
const CvModel = require('../models/Cv');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const { verifyProfessional } = require('../validator/professional');
const { Types } = require('mongoose');

module.exports = {
    // requete POST / pour creer une edu ///OK
    create: async (req, res) => {
        //chercher le user selon le cv
        try {
            const cv = await CvModel.findOne({ author: req.user._id.toString() });
            const author = req.user;
            if (!author) {
                res.status(400).send({
                    message: 'Author not exist'
                });
            }
            const newExperience = new EduModel({
                cv: cv._id,
                title: req.body.title,
                institution: req.body.institution,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            });
            await newExperience.save();
            const { _id, cvId, title, institution, startDate, endDate } = newExperience;
            res.status(201).send({
                id: _id,
                cv: cv._id,
                title: title,
                institution: institution,
                startDate: startDate,
                endDate: endDate
            });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    // requete GET /:id pour recuperer une eddu
    find: async (req, res) => {
        const proId = req.params.id;

        if (!Types.ObjectId.isValid(proId)) {
            return res.status(400).send({ message: 'Invalid profession ID' });
        }

        EduModel.findById(proId)
            .then((educations) => {
                res.status(200).send(educations);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    },

    // requete PUT /:id mettre a jour les professions
    update: async (req, res) => {
        try {
            const educationId = req.params.id;

            const education = await EduModel.findById(educationId);
            if (!education) {
                //check exists
                res.status(400).send({});
                return;
            }

            const cv = await CvModel.findById(education.cv);
            if (!cv) {
                throw new Error('Cannot find cv to update');
            }
            //check user
            if (req.user._id.toString() !== cv.author.toString()) {
                res.status(403).send({});
                return;
            }

            const newEducation = { ...education._doc, ...req.body };
            const { title, institution, startDate, endDate } = newEducation;
            EduModel.findByIdAndUpdate(
                educationId,
                {
                    title,
                    institution,
                    startDate,
                    endDate
                },
                { new: true }
            )
                .then((updateEdu) => {
                    res.send(updateEdu);
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
        const educationId = req.params.id;

        const education = await EduModel.findById(educationId);
        if (!education) {
            //check exists
            res.status(400).send({});
            return;
        }

        const cv = await CvModel.findById(education.cv);
        if (!cv) {
            throw new Error('Cannot find cv to update');
        }
        //check user
        if (req.user._id.toString() !== cv.author.toString()) {
            res.status(403).send({});
            return;
        }

        EduModel.findByIdAndDelete(educationId)
            .then((cv) => {
                res.send({
                    message: `Education with id=${cv.id} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete Profession with id=${cvId}`);
            });
    }
};
