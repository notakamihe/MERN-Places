const express = require('express')
const router = express.Router()
const config = require('../config')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const User = require('../models/User')

router.post('/register', async (req, res) => {
    const {email, password, address, name, dob} = req.body

    if (!email) {
        return res.status(400).json({
            message: "Email must not be blank."
        })
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/)) {
        return res.status(400).json({
            message: "Email is not valid."
        })
    }

    if (!password) {
        return res.status(400).json({
            message: "Password must not be blank."
        })
    } else if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be 8+ characters."
        })
    }
})

router.post('/login', async (req, res) => {
    
})

router.get('/', async (req, res) => {
    return res.json(await User.find())
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