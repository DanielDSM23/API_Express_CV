const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessionalCv = new mongoose.Schema({
    cv: {
        type: Schema.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('ProfessionalCv', ProfessionalCv);
