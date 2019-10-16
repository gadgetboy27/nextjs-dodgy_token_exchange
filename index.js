const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const terms = require('./Terms')

const app = express()

// Init middleware
app.use(logger)

// Gets terms
app.get('/api/terms', (req, res) => res.json(terms)
)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
