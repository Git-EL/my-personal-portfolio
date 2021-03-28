require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')

const mainRouter = require('./routes/main')
// const anmeldenRouter = require('./routes/anmelden')
const loginRouter = require('./routes/login')
const jobsRouter = require('./routes/jobs')

const adresse = process.env.DB || 'mongodb+srv://es-le-33:stray1234@cluster0.ppjeq.mongodb.net/PortfolioDB'
mongoose.connect(adresse, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})
db.once('open', () => {
  console.log(`Mit der Datenbank auf ${adresse} verbunden`)
})

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(csurf({
  cookie: true,
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS', 'DELETE']
}))
app.use(express.static('public'))
app.use(express.static('images'))
app.use(express.static('node_modules'))

app.use('/', mainRouter)
// app.use('/anmelden', anmeldenRouter)
app.use('/login', loginRouter)
app.use('/jobs', jobsRouter)

app.get('/logout', (req, res) => {
  res.clearCookie('nutzerToken')
  res.render('ausgeloggt', { token: true})
})

app.get('*', (req, res) => {
  res.render('nichtGefunden')
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server läuft auf ${port}`))
