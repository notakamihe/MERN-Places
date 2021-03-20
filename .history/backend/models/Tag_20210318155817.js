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

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag

tagSchema.set('toJSON', { virtuals: true })


tagSchema.method('getPopularity', async function (cb) {
    const tags = await Tag.find()

    return cb(tags)
});


tagSchema.methods.getPopularity(function (popularity) {
    tagSchema.virtual('popularity').get(() => {
        return popularity
    });
})

