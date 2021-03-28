const express = require('express')
const router = express.Router()

const { jobSeiteAnzeigen, jobDatenEintragen, jobDatenLoeschen, jobAnlegenSeite, jobAnzeigenseite } = require('../controller/jobs-controller')

router
  .route('/')
    .get(jobSeiteAnzeigen)
    .post(jobDatenEintragen)

router.route('/:id').delete(jobDatenLoeschen)

router.route('/anlegen').get(jobAnlegenSeite)

router.route('/anzeigen').get(jobAnzeigenseite)


module.exports = router