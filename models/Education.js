const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Educations = new mongoose.Schema({
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
        type: String
    }
});

module.exports = mongoose.model('Educations', Educations);
