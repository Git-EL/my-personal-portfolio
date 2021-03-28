const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { NutzerModell } = require("../models/nutzer")

exports.loginLaden = (req, res) => {
  if(!req.cookies.nutzerToken == true) {
    return res.render("loginseite", {token: true, csrfToken: req.csrfToken(), style: 'loginseite.css' })
  } else {res.render('loginseite', {csrfToken: req.csrfToken(), style: 'loginseite.css'} )}
}

exports.loginPost = async (req, res, next) => {
  let nutzer = req.body
	try {
		let nutzerVonDatenbank = await NutzerModell.findOne({ email: nutzer.email })
		console.log(nutzerVonDatenbank);
	if (nutzerVonDatenbank === null) {
			return res.status(401).redirect('/login')
      // .render('nichteingeloggt')
		}
		let vergleichVonPasswort = await bcrypt.compare(nutzer.passwort, nutzerVonDatenbank.passwort)
		if (vergleichVonPasswort) {
      let token = jwt.sign({
    nutzerName: nutzerVonDatenbank.nutzername,
    nutzerPw: nutzerVonDatenbank.passwort,
    emailAdresse: nutzerVonDatenbank.email
  }, process.env.JWT || 'ein Tokengeheimnis', { expiresIn: '24h' })
  let einTag = (1000 * 60 * 60 * 24)
  res.status(200).cookie('nutzerToken', token, {
    maxAge: einTag,
    httpOnly: true,
  }).render('eingeloggt', {style: 'eingeloggt.css'} )
} else {
  res.status(401).render('loginfehlgeschlagen', {style: 'loginfehlgeschlagen.css', token: true})
}
} catch (error) {
res.status(401).render('loginfehlgeschlagen', {style: 'loginfehlgeschlagen.css', token: true})
}
  }


