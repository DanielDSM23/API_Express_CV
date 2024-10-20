const ProModel = require('../models/Professional');
const CvModel = require('../models/Cv');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const { verifyProfessional } = require('../validator/professional');
const { Types } = require('mongoose');

module.exports = {
    // requete POST / pour creer une experience ///OK
    create: async (req, res) => {
        verifyProfessional(req.body);
        //chercher le user selon le cv
        try {
            const cv = await CvModel.findOne({ author: req.user._id.toString() });
            const author = req.user;
            if (!author) {
                res.status(400).send({
                    message: 'Author not exist'
                });
            }
            const newProfession = new ProModel({
                cv: cv._id,
                title: req.body.title,
                company: req.body.company,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            });
            await newProfession.save();
            const { _id, cvId, title, company, startDate, endDate } = newProfession;
            res.status(201).send({
                id: _id,
                cv: cv._id,
                title: title,
                company: company,
                startDate: startDate,
                endDate: endDate
            });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    // requete GET /:id pour recuperer une profession
    find: async (req, res) => {
        const proId = req.params.id;

        if (!Types.ObjectId.isValid(proId)) {
            return res.status(400).send({ message: 'Invalid profession ID' });
        }

        ProModel.findById(proId)
            .then((professions) => {
                res.status(200).send(professions);
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
            const professionId = req.params.id;

            const profession = await ProModel.findById(professionId);
            if (!profession) {
                //check exists
                res.status(400).send({});
                return;
            }

            const cv = await CvModel.findById(profession.cv);
            if (!cv) {
                throw new Error('Cannot find cv to update');
            }
            //check user
            if (req.user._id.toString() !== cv.author.toString()) {
                res.status(403).send({});
                return;
            }

            const newProfession = { ...profession._doc, ...req.body };
            const { title, company, startDate, endDate } = newProfession;
            ProModel.findByIdAndUpdate(
                professionId,
                {
                    title,
                    company,
                    startDate,
                    endDate
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
        const professionId = req.params.id;

        const profession = await ProModel.findById(professionId);
        if (!profession) {
            //check exists
            res.status(400).send({});
            return;
        }

        const cv = await CvModel.findById(profession.cv);
        if (!cv) {
            throw new Error('Cannot find cv to update');
        }
        //check user
        if (req.user._id.toString() !== cv.author.toString()) {
            res.status(403).send({});
            return;
        }

        ProModel.findByIdAndDelete(professionId)
            .then((cv) => {
                res.send({
                    message: `Profession with id=${cv.id} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete Profession with id=${cvId}`);
            });
    }
};
