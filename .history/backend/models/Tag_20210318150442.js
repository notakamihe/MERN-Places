const mongoose = require('mongoose')

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
    },
    popularity: {
        type: Number
    }
})

tagSchema.virtual("popularity").get(function () {
    return 0
});

module.exports = mongoose.model('Tag', tagSchema);