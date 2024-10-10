const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        author: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
