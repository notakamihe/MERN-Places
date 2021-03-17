const express = require('express')
const router = express.Router()

const Place = require('../models/Place')

router.get('/', async (req, res) => {
    res.send(await Place.find());
})

module.exports = router