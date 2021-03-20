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

tagSchema.method('getPopularity', async (cb) => {
    const places = Place.find()

    console.log(places);

    return cb(9)
});

tagSchema.methods.getPopularity((popularity) => {
    tagSchema.virtual('popularity').get(() => {
        return popularity
    });
})

module.exports = mongoose.model('Tag', tagSchema);