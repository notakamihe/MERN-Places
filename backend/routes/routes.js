const express = require('express')
const app = express()
const router = express.Router()

const places = require('./places')
const tags = require('./tags')
const users = require('./users')

router.use('/places', places)
router.use('/tags', tags)
router.use('/users', users)

module.exports = router