const express = require('express')
const router = express.Router()

const { loginLaden, loginPost } = require('../controller/login-controller.js')

router.route('/').get(loginLaden)
router.route('/').post(loginPost)

module.exports = router