const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({dest: '/uploads/'})

const Place = require('../models/Place')

router.get('/', async (req, res) => {
    res.send(await Place.find());
})

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file);
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

    console.log(tags);

    const payload = {name, description, ratings, location, hoursOpen, tags, additionalInfo}

    payload.ratings = ratings || []
    payload.tags = tags || []
    payload.additionalInfo = additionalInfo || {}

    Place.collection.insertOne(payload).then(result => {
        res.json(result.ops[0])
    }).catch(err => {
        res.status(400).json({
            message: "Failed to create place."
        })
    })
})

router.get('/:id', async (req, res) => {
    Place.findById(req.params.id).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(400).json({
            message: "Place not found."
        })
    })
})

router.delete('/:id', async (req, res) => {
    Place.deleteOne({_id: req.params.id}).then(result => {
        res.send("Successfully deleted.")
    }).catch(err => {
        res.status(400).json({
            message: "Place not found."
        })
    })
})

router.put('/:id', async (req, res) => {
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
    payload.tags = tags || []
    payload.additionalInfo = additionalInfo || {}

    try {
        let place = await Place.findById(req.params.id)

        if (place == null) {
            return res.status(400).json({
                message: "Place not found"
            })
        }

        place.name = payload.name
        place.description = payload.description
        place.ratings = payload.ratings
        place.location = payload.location
        place.hoursOpen = payload.hoursOpen
        place.tags = payload.tags
        place.additionalInfo = payload.additionalInfo

        const updatedPlace = await place.save()
        res.status(201).json(updatedPlace)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router