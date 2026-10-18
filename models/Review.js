const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new mongoose.Schema({
    author: {
        type: Schema.ObjectId,
        required: true
    },
    cv: {
        type: Schema.ObjectId,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Review', Review);
