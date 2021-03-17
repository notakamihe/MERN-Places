const express = require('express')
const app = express()
const cors = require('cors')

const routes = require('./routes/routes')

app.use(cors())
app.use(express.json())

app.use('/', routes)

app.listen(4000, () => console.log("Server started on port 4000."))