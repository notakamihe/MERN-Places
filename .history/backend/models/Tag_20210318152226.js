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

tagSchema.virtual("popularity").get(async function () {
    const souce = await Place.findById('60525a0359c88322149d49b6')

    if (souce) {
      return "yes"
    }

    return "hi";
});

module.exports = mongoose.model('Tag', tagSchema);