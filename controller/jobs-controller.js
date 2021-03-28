const { JobModell } = require('../models/job')
const jwt = require('jsonwebtoken')

exports.jobSeiteAnzeigen = (req, res, next) => {
  if (req.cookies.nutzerToken) {
    let token = req.cookies.nutzerToken
    let lesbaresToken = jwt.verify(token, process.env.JWT || 'ein Tokengehemnis')
    if (lesbaresToken) {
      return res.render('neueposition', { seitentitel: 'Neuen Job anlegen', csrfToken: req.csrfToken(), style: 'neueposition.css', token: false})
    }
  } else {
    res.status(400).render('nichteingeloggt', {style: 'nichteingeloggt.css'})
  }
}

exports.jobDatenEintragen = (req, res, next) => {
  console.log(req.body)
  JobModell.create(req.body).then((ergebnis) => {
    res.render('jobpostergebnis', ergebnis)
  }).catch((fehler) => {
    res.render('fehler', fehler)
  })
}

exports.jobDatenLoeschen = (req, res, next) => {
  JobModell.deleteOne({ _id: req.body.id }).then((ergebnis) => {
    console.log(req.body.id)
    res.status(200).json({ result: `Job wurde erfolgreich gelöscht` })
  }).catch((fehler) => {
    console.log(fehler)
  })
}

exports.jobAnlegenSeite = (req, res, next) => {
  if (req.cookies.nutzerToken) {
    let token = req.cookies.nutzerToken
    let lesbaresToken = jwt.verify(token, process.env.JWT || 'ein Tokengeheimnis')
    if (lesbaresToken) {
      console.log(lesbaresToken)
      return res.status(200).render('jobanlegenseite', { name: lesbaresToken.nutzerName, style: 'jobanlegenseite.css' })
    }
  } else {
    res.status(400).redirect('/login')
  // .render('nichteingeloggt')
  }
}

exports.jobAnzeigenseite = (req, res, next) => {
  JobModell.find().lean().then((ergebnis) => {
    console.log(ergebnis)
    res.render('jobanzeigenseite', { jobs: ergebnis, token: true, seitenscript: '<script src="/delete.js"></script>', style: 'jobanzeigen.css' })
  }).catch((fehler) => {
    res.render('jobanzeigenseite', { fehler: fehler, token: true, style: 'jobanzeigen.css'  })
  })
}
