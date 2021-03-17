const express = require('express')
const router = express.Router()

const Tag = require('../models/Tag')
const Place = require('../models/Place')

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
    Tag.findById(req.params.id).then(async result => {
        Place.find().then(r => {
            r.forEach(p => {
                p.tags = p.tags.filter(t => t.toString() != req.params.id)
                p.save()
            })
        })

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