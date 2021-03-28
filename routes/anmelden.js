const express = require('express')
const router = express.Router()
const { check }  = require('express-validator')

const { anmeldeseiteLaden, erstelleNutzer } = require('../controller/anmelden-controller.js')

const validNutzer = [
  check('nutzername')
    .not()
    .isEmpty()
    .withMessage('Nutzername muss angegeben werden.')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig.')
    .trim()
    .normalizeEmail(),
  check('passwort')
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage('Passwort muss angegeben werden.')
    .trim()
];


router.route('/').get(anmeldeseiteLaden)

router.route('/').post(validNutzer, erstelleNutzer)


module.exports = router