const mongoose = require('mongoose')

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
        default: []
    },
    location: {
        type: String,
        required: true
    },
    hoursOpen: {
        type: [Object]
    },
    tags: {
        type: [mongoose.mongo.ObjectID],
        default: []
    },
    additionalInfo: {
        type: Object,
        default: {}
    }
})

module.exports = mongoose.model('Place', placeSchema);