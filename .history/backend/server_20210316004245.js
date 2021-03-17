const express = require('express')
const app = express()
const cors = require('cors')

const routes = require('./routes/routes')

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.listen(8000, () => console.log("Server started on port 8000."))