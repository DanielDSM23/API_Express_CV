const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CvSchema = new mongoose.Schema({
    author: {
        type: Schema.ObjectId,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Cv', CvSchema);
