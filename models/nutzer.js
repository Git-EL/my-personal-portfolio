const mongoose = require('mongoose')
const { Schema } = mongoose

const NutzerSchema = new Schema(
  { vorname: String,
    nachname: String,
    alter: Number,
    wohnort: String,
    beruf: String,
    nutzername: String,
    email: String,
    passwort: String
  }
)

const NutzerModell = mongoose.model('Nutzer', NutzerSchema, 'nutzer')

module.exports = { NutzerModell}
