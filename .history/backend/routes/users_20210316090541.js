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

    if (!address) {
        return res.status(400).json({
            message: "Address must not be blank."
        })
    }

    if (!name) {
        return res.status(400).json({
            message: "Name must not be blank."
        })
    }

    if (!dob) {
        return res.status(400).json({
            message: "Dob must not be blank."
        })
    } else if (!dob.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])*/)) {
        return res.status(400).json({
            message: "Dob not in the correct format. Must be YYYY-MM-DD"
        })
    }

    var hashedPassword = bcrypt.hashSync(password, 8)
    const payload = {email, hashedPassword, address, name, dob}

    User.collection.insertOne(payload).then(result => {
        var token = jwt.sign({ id: result.ops[0]._id }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).json({ auth: true, token: token });
    }).catch(err => {
        res.status(500).send("Problem registering user.")
    })
})

router.post('/login', async (req, res) => {
    
})

router.get('/user', async (req, res) => {
    var token = req.headers['x-access-token'];

    if (!token) 
        return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) 
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id).then(result => {
            res.json(result)
        }).catch(err => {
            res.status(400).json({
                message: "User not found."
            })
        })
    });
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