const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  firma: String,
  position: String,
  von: String,
  bis: String,
  textfeld: String
})

const JobModell = mongoose.model('Job', JobSchema, 'jobs')

module.exports = { JobModell}
