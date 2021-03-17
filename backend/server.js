const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const routes = require('./routes/routes')

mongoose.connect('mongodb://localhost/placesdb', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.listen(8000, () => console.log("Server started on port 8000."))