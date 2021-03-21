const express = require('express')
const router = express.Router()
const config = require('../config')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const User = require('../models/User')
const Place = require('../models/Place')

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
    const payload = {email, password: hashedPassword, address, name, dob}

    User.collection.insertOne(payload).then(result => {
        var token = jwt.sign({ id: result.ops[0]._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(201).json({ auth: true, token: token });
    }).catch(err => {
        if (err.keyPattern.email) {
            res.status(400).send("Email not available.")
        } else {
            res.status(500).send(err)
        }
    })
})

router.post('/login', async (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) 
            return res.status(500).json({
                message: err.message
            });

        if (!user) 
            return res.status(400).json({
                message: 'No user found.'
            });

        if (!req.body.password) {
            return res.status(400).json({
                message: 'No password provided.'
            })
        }
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) 
            return res.status(401).send({
                message: 'Invalid password.'
            });
        
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });
        
        res.status(200).send({ auth: true, token: token });
    });
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
    User.findById(req.params.id).then(result => {
        Place.find().then(res => {
            res.forEach(p => {
                console.log(p);
                p.ratings = p.ratings.filter(rating => rating.user && rating.user != req.params.id)
            })
        })

        // result.remove()
        res.send("Successfully deleted.")
    }).catch(err => {
        res.status(400).json({
            message: "User not found."
        })
    })
})

router.put('/:id', async (req, res) => {
    const {email, address, name, dob, isDarkModeOn} = req.body

    if (!email) {
        return res.status(400).json({
            message: "Email must not be blank."
        })
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/)) {
        return res.status(400).json({
            message: "Email is not valid."
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

    User.findById(req.params.id).then(async result => {
        result.email = email
        result.address = address
        result.name = name
        result.dob = dob
        result.isDarkModeOn = Boolean(isDarkModeOn)

        const updatedUser = await result.save()
        res.status(200).json(updatedUser)
    }).catch(err => {
        res.status(400).json({
            message: "User not found."
        })
    })
})

router.put('/:id/change-password', async (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({
            message: "Password must not be blank."
        })
    } else if (req.body.password.length < 8) {
        return res.status(400).json({
            message: "Password must be 8+ characters."
        })
    }

    User.findById(req.params.id).then(async result => {
        result.password = bcrypt.hashSync(req.body.password, 8)

        const updatedUser = await result.save()
        res.status(200).json(updatedUser)
    }).catch(err => {
        res.status(400).json({
            message: "User not found."
        })
    })
})

module.exports = router