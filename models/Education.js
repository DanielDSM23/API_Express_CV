const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationCv = new mongoose.Schema({
    cv: {
        type: Schema.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('EducationCv', EducationCv);
