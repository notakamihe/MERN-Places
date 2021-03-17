const express = require('express')
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
        res.send(result)
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})

router.delete('/:id', async (req, res) => {
    Tag.findById(req.params.id).then(result => {
        result.remove()
        res.send("Successfully deleted.")
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})




module.exports = router