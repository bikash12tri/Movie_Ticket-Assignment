const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['movie', 'show']
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true
    },
    runTime: {
        type: String,
        required: true,
        trim: true
    },
    quality: {
        type: String,
        required: true,
        trim: true
    },
    isOutDated: {
        type: String,
        default: false
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: null
    },
    outDatedAt: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Movie', movieSchema)