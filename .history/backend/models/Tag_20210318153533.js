const mongoose = require('mongoose')
const Place = require('../models/Place')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

tagSchema.set('toJSON', { virtuals: true })

tagSchema.method('getPopularity', (cb) => {
    console.log("hi");
    return cb(9)
});

tagSchema.methods.getPopularity(function (displayName) {
    tagSchema.virtual('displayName').get(function () {
        return displayName
    });
})

module.exports = mongoose.model('Tag', tagSchema);