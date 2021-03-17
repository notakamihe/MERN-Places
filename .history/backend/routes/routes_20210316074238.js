const express = require('express')
const app = express()
const router = express.Router()

const places = require('./places')
const tags = require('./tags')

router.use('/places', places)
router.use('/tags', tags)

module.exports = router