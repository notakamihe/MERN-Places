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

tagSchema.method('getDisplayName', async function (cb) { // <-- added callback
    console.log("hi");
    cb("hi")
});

schema.getDisplayName(function (displayName) {
    console.log("sup");
})

module.exports = mongoose.model('Tag', tagSchema);