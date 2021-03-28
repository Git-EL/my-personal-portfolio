const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { NutzerModell } = require("../models/nutzer")

exports.anmeldeseiteLaden = (req, res) => {
	if(!req.cookies.nutzerToken == true) {
    return res.render("anmeldenseite", {token: true, csrfToken: req.csrfToken(), style: 'anmeldeseite.css'})
  } else {res.render("anmeldenseite", {csrfToken: req.csrfToken(), style: 'anmeldeseite.css'})}
}

exports.erstelleNutzer = async (req, res, next) => {
	try {
 		const nutzer = req.body;
 		const errors = validationResult(req)
 		if (!errors.isEmpty()) {
 			return res.status(422).json({
				fehlerBeiValidierung: errors.array()})
 		}
    
 	  let schonVorhandenUser = await NutzerModell.find({ email: nutzer.email })
 		if (schonVorhandenUser.length >= 1) {
 			return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
 		}

 		let passwortGehashed = await bcrypt.hash(nutzer.passwort, 10)
 		let erstelleNutzer = await NutzerModell.create({ ...nutzer, passwort: passwortGehashed })
		res.status(201).render("angemeldet", {style: 'angemeldet.css'})

     console.log(erstelleNutzer)
 	} catch (fehler) {
 		res.status(500).render('nichtangemeldet', {object: fehler})
 	}

 }