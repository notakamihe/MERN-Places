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
    }
})

tagSchema.set('toJSON', { virtuals: true })

tagSchema.virtual("popularity").get(function () {
    console.log("hi mom");
    return 5 * 5
});

module.exports = mongoose.model('Tag', tagSchema);