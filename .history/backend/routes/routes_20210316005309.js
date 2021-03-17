const express = require('express')
const app = express()
const router = express.Router()

const places = require('./places').router

router.use('/places', places)

module.exports = router