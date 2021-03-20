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

teamSchema.virtual('squad').get(function() {
    return 
});

tagSchema.methods.getSquad = async function(callback) {
    callback(0)
};
module.exports = mongoose.model('Tag', tagSchema);