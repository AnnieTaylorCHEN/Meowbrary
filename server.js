if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true } )
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3002)
