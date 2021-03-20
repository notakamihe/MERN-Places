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

schema.statics.getTag = async function() {
    return this.find({});
};

tagSchema.method('getPopularity', async function (cb) {
    const tags = await this.getTag()

    return cb(tags)
});


tagSchema.methods.getPopularity(function (popularity) {
    tagSchema.virtual('popularity').get(() => {
        return popularity
    });
})

module.exports = mongoose.model('Tag', tagSchema);