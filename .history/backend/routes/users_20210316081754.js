const express = require('express')
const router = express.Router()
const config = require('../config')

const User = require('../models/User')

router.post('/register', async (req, res) => {

})

router.post('/login', async (req, res) => {
    
})

router.get('/', async (req, res) => {
    return res.json(await User.find())
})

router.post('/', async (req, res) => {
    
})

router.get('/:id', async (req, res) => {
    User.findById(req.params.id).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})

router.delete('/:id', async (req, res) => {
    
})

router.put('/:id', async (req, res) => {
    
})

module.exports = router