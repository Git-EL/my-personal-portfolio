const express = require('express')
const router = express.Router()

const { inhalteLaden } = require('../controller/main-controller')

router.route('/').get(inhalteLaden)

module.exports = router


