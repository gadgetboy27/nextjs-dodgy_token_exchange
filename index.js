const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
// const logger = require('./middleware/logger')
const terms = require('./terms')
// const bodyParser = require('bodyParser')

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

app.post('/send', (req, res) => {
  console.log(req.body.params)
  //   // Setting up email send from radio btn choice
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',

//   })
})

// Set static folder
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/api/routes', require('./routes/api/routes'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
