const express = require('express')
const router = express.Router()

const Place = require('../models/Place')

router.get('/', async (req, res) => {
    res.send(await Place.find());
})

router.post('/', async (req, res) => {
    const {name, description, ratings, location, hoursOpen, tags, additionalInfo} = req.body

    if (!name) {
        return res.status(400).json({
            message: "Name must not be blank"
        })
    }

    if (!description) {
        return res.status(400).json({
            message: "Description must not be blank"
        })
    }

    if (!location) {
        return res.status(400).json({
            message: "Location must not be blank"
        })
    }

    const payload = {name, description, ratings, location, hoursOpen, tags, additionalInfo}

    payload.ratings = ratings || []
    payload.tags = ratings || []

    Place.collection.insertOne(payload).then(result => {
        res.json(result.ops[0])
    }).catch(err => {
        res.status(400).json({
            message: "Failed to create place."
        })
    })
})

module.exports = router