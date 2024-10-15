const RevModel = require('../models/Review');
const CvModel = require('../models/Cv');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const { Types } = require('mongoose');
const { verifyReview } = require('../validator/review');
const ProModel = require('../models/Professional');

module.exports = {
    // requete POST / pour creer une review ///OK
    create: async (req, res) => {
        try {
            verifyReview(req.body);
            const cvDb = await CvModel.findById(req.body.cv);
            if (!cvDb) {
                res.status(400).send({});
            }
            const newRate = new RevModel({
                author: req.user._id,
                cv: cvDb._id,
                rate: req.body.rate,
                description: req.body.description
            });
            await newRate.save();
            const { _id, author, cv, rate, description } = newRate;
            res.status(201).send({
                id: _id,
                author: author,
                cv: cv,
                rate: rate,
                description: description
            });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },

    // requete GET /:id pour recuperer l'ensemble des reviews sur un cv
    find: async (req, res) => {
        const cvId = req.params.id;

        if (!Types.ObjectId.isValid(cvId)) {
            return res.status(400).send({ message: 'Invalid CV ID' });
        }

        RevModel.find({ cv: cvId })
            .then((cvs) => {
                res.send(cvs);
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
            const reviewId = req.params.id;
            const review = await RevModel.findById(reviewId);

            if (!review) {
                res.status(400).send({});
                return;
            }

            if (req.user._id.toString() !== review.author.toString()) {
                res.status(403).send({});
                return;
            }

            const newReview = { ...review, ...req.body };

            const { author, cv, rate, description } = newReview;
            //verifyReview(req.body);

            RevModel.findByIdAndUpdate(
                reviewId,
                {
                    author: author,
                    cv,
                    rate: rate,
                    description: description
                },
                { new: true }
            )
                .then((updateReview) => {
                    res.send(updateReview);
                })
                .catch((error) => {
                    res.status(500).send(error.message || `Cannot update review with id=${cvId}`);
                });
        } catch (error) {
            res.status(500).send({});
        }
    },

    // requete DELETE /:id Supprimer une review
    delete: async (req, res) => {
        const reviewId = req.params.id;

        const review = await RevModel.findById(reviewId);
        if (!review) {
            res.status(400).send({});
            return;
        }
        if (req.user._id.toString() !== review.author.toString()) {
            res.status(403).send({});
            return;
        }

        RevModel.findByIdAndDelete(reviewId)
            .then((cv) => {
                res.send({
                    message: `Review with id=${cv.id} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete Profession with id=${cvId}`);
            });
    }
};
