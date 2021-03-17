const express = require('express')
const Place = require('../models/Place')
const router = express.Router()

const Tag = require('../models/Tag')

router.get('/', async (req, res) => {
    return res.json(await Tag.find())
})

router.post('/', async (req, res) => {
    const {name, description} = req.body

    if (!name) {
        return res.status(400).json({
            message: "Name must not be blank."
        })
    }

    if (!description) {
        return res.status(400).json({
            message: "Description must not be blank."
        })
    }

    const payload = {name, description}

    Tag.collection.insertOne(payload).then(result => {
        res.json(result.ops[0])
    }).catch(err => {
        res.status(400).json({
            message: "Failed to create tag."
        })
    })
})

router.get('/:id', async (req, res) => {
    Tag.findById(req.params.id).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})

router.delete('/:id', async (req, res) => {
    Tag.findById(req.params.id).then(result => {
        console.log(result._id);

        // Place.updateMany({}, { $set: { tags: result.tags.filter(t => t != result.ops[0]._id)}}).catch(err => {
        //     res.status(500).json({
        //         message: "Could not remove tag id."
        //     })
        // })

        // result.remove()
        res.send("Successfully deleted.")
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})

router.put('/:id', async (req, res) => {
    const {name, description} = req.body

    if (!name) {
        return res.status(400).json({
            message: "Name must not be blank."
        })
    }

    if (!description) {
        return res.status(400).json({
            message: "Description must not be blank."
        })
    }

    const payload = {name, description}

    Tag.findById(req.params.id).then(async result => {
        result.name = payload.name
        result.description = payload.description

        const updatedTag = await result.save()
        res.status(201).json(updatedTag)
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})


module.exports = router