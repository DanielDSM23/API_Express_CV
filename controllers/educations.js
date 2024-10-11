


const bookModel = require('./../models/Book');
const mongoose = require('mongoose');

module.exports = {
    getAllEducations: (req, res) => {
        const { 
            query: { page = 1, limit = 10 }
        } = req.user;
        const allEdu = mongoose.model('Educations').paginate({}, { page, limit }, (err, result) => {
            if (err) {
                res.status(500).send
            }
            res.send(result);
        });

        res.send(allEdu);
    },

    getEducation: (req, res) => {
        const { id } = req.params;
        const edu = mongoose.model('Educations').findById(id, (err, result) => {
            if (err) {
                res.status(500).send
            }
            res.send(result);
        });

        res.send(edu);
    },

    createEducation: (req, res) => {
        const { title, institution, startDate, endDate, description } = req.body;
        const newEdu = new mongoose.model('Educations')({
            title,
            institution,
            startDate,
            endDate,
            description
        });
        newEdu.save((err, result) => {
            if (err) {
                res.status(500).send
            }
            res.send(result);
        });
    },

    updateEducation: (req, res) => {
        const { id } = req.params;
        const { title, institution, startDate, endDate, description } = req.body;
        const updatedEdu = mongoose.model('Educations').findByIdAndUpdate(id, {
            title,
            institution,
            startDate,
            endDate,
            description
        }, { new: true }, (err, result) => {
            if (err) {
                res.status(500).send
            }
            res.send(result);
        });

        res.send(updatedEdu);
    },

    deleteEducation: (req, res) => {
        const { id } = req.params;
        const deletedEdu = mongoose.model('Educations').findByIdAndDelete(id, (err, result) => {
            if (err) {
                res.status(500).send
            }
            res.send(result);
        });

        res.send(deletedEdu);
    }
};
