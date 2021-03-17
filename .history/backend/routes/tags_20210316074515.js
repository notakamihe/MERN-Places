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
})

module.exports = router