const express = require('express')
const router = express.Router()

const Tag = require('../models/Tag')
const Place = require('../models/Place')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

router.get('/', async (req, res) => {
    return res.json(await Tag.find())
})

router.post('/', upload.single('image'), async (req, res) => {
    const {name, description} = req.body

    if (!name) {
        return res.status(400).json({
            message: "Name must not be blank."
        })
    } else if (name.length > 30) {
        return res.status(400).json({
            message: "Name must exceed 30 characters."
        })
    }

    if (!description) {
        return res.status(400).json({
            message: "Description must not be blank."
        })
    }

    const payload = {name, description, imageUrl: req.file ? req.file.path : null}

    Tag.collection.insertOne(payload).then(result => {
        res.json(result.ops[0])
    }).catch(err => {
        res.status(400).json({
            message: "Failed to create tag."
        })
    })
})

router.get('/:id', async (req, res) => {
    Tag.findById(req.params.id).then(async result => {
        const places = await Place.find({ tags: { "$in" : req.params.id} })

        console.log(places.length);

        res.json(result)
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})

router.delete('/:id', async (req, res) => {
    Tag.findById(req.params.id).then(async result => {
        Place.find().then(r => {
            r.forEach(p => {
                p.tags = p.tags.filter(t => t.toString() != req.params.id)
                p.save()
            })
        })

        result.remove()
        res.send("Successfully deleted.")
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})

router.put('/:id', async (req, res) => {
    const {name, description} = req.body

    if (!name) {
        return res.status(400).json({
            message: "Name must not be blank."
        })
    } else if (name.length > 30) {
        return res.status(400).json({
            message: "Name must exceed 30 characters."
        })
    }

    if (!description) {
        return res.status(400).json({
            message: "Description must not be blank."
        })
    }

    const payload = {name, description}

    Tag.findById(req.params.id).then(async result => {
        result.name = payload.name
        result.description = payload.description

        const updatedTag = await result.save()
        res.status(201).json(updatedTag)
    }).catch(err => {
        res.status(400).json({
            message: "Tag not found."
        })
    })
})

router.put('/:id/image', upload.single('image'), async (req, res) => {
    let tag;

    try {
        tag = await Tag.findById(req.params.id)

        if (tag == null) {
            return res.status(400).json({
                message: "Place not found."
            })
        }

        tag.imageUrl = req.file ? req.file.path.toString() : null
        const updatedPlace = await tag.save()
        res.status(201).json(tag)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router