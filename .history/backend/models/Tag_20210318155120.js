const mongoose = require('mongoose')
const Place = require('../models/Place')

const tagSchema = new mongoose.Schema({
    _id: {
        type: mongoose.mongo.ObjectId
    },
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
    console.log(this.toObject());
    const places = await Place.find({ tags: { "$in" : this._id} })

    console.log(places);

    return cb(9)
});

tagSchema.methods.getPopularity((popularity) => {
    tagSchema.virtual('popularity').get(() => {
        return popularity
    });
})

module.exports = mongoose.model('Tag', tagSchema);