const express = require('express')
const router = express.Router()

const Tag = require('../models/Tag')

router.get('/', async (req, res) => {
    return res.json(await Tag.find())
})

module.exports = router