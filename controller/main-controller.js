exports.inhalteLaden = (req, res, next) => {
  if (!req.cookies.nutzerToken == true) {
    return res.render('startseite', {token: true, style: 'startseite.css' })
  } else {res.render('startseite', {style: 'startseite.css'})}
}
