const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
// const logger = require('./middleware/logger')
const terms = require('./Terms')

const app = express()

// Init middleware
// app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Homepage route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Invite App',
    terms
  })
)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/terms', require('./routes/api/terms'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
