const mongoose = require('mongoose');

const bookTicketSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    theaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater'
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    theater: {
        type: String,
        required: true
    },
    movieName: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Bookticket', bookTicketSchema)