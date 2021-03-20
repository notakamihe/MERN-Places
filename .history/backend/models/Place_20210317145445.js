const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ratings: {
        type: [Object],
        required: true,
        default: []
    },
    location: {
        type: String,
        required: true
    },
    hoursOpen: {
        type: Object
    },
    tags: {
        type: [mongoose.mongo.ObjectID],
        required: true,
        default: []
    },
    additionalInfo: {
        type: Object,
        default: {}
    },
    averageRating: {
        type: Number,
        required: true,
        default: function () {
            return 0
        }
    },
    imageUrl: {
        type: String
    }
})

placeSchema.pre('init', function(next) {
    const ratingsList = this.ratings.map(r => r.rating)
    this.averageRating = ratingsList.reduce((a, b) => a + b) / ratingsList.length;
   next();   
});

placeSchema.pre('save', function(next) {
    return 0
   next();   
});

module.exports = mongoose.model('Place', placeSchema);