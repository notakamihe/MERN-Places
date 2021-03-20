const mongoose = require('mongoose')
const utils = require('../utils')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ratings: {
        type: [Object],
        required: true,
        default: []
    },
    location: {
        type: String,
        required: true
    },
    hoursOpen: {
        type: Object
    },
    tags: {
        type: [mongoose.mongo.ObjectID],
        required: true,
        default: []
    },
    additionalInfo: {
        type: Object,
        default: {}
    },
    averageRating: {
        type: Number,
    },
    imageUrl: {
        type: String
    }
})


placeSchema.pre('save', function(next) {
    utils.averageRating(this.ratings)  
    next()
});

module.exports = mongoose.model('Place', placeSchema);