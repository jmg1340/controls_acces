'use strict'

const User = require("../models/user")




function getUser (req, res){
	let userId = req.params.userId
	User.findById(userId, (err, user) => {
		if (err) return   res.status(500).send({ message: `hi ha hagut un error al recuperar les dades del usuari: ${ err }` })
		if (!user) return res.status(404).send({ message:  `no hi ha cap usuari amb id ${ userId } `})

		res.status(200).send({ message: `usuari trobat: ${user}`})
	})
}


function getUsers(req, res){
	console.log("mostra un array d'usuaris")
	User.find({}, (err, usuaris) => {
		if (err) return res.status(500).send({message: `error al recuperar els usuaris: ${err}`})
		if (! usuaris) return res.status(404).send({ message: "no s'ha trobat cap usuari"})


		res.status(200).send({ usuaris: [] })
	})	
}


function updateUser(req, res){
	console.log("modificar usuari amb Id: " + req.params.userId)
	
	let userId = req.params.userId
	let dadesActualitzades = req.body

	User.findByIdAndUpdate( userId, dadesActualitzades, (err, userUpdated) => {
		if (err) return res.status(500).send({ message: "error al modificar les dades" })
		res.status(200).send({ message: `dades actualitzades: ${ userUpdated }` })
	})


	res.status(200).send({ Id_usuari: req.params.userId })
}



function newUser (req, res){
	console.log(req.body)
	
	let nouUsuari = new User()
	nouUsuari.numero = req.body.numero
	nouUsuari.nom    = req.body.nom
	nouUsuari.congom = req.body.cognom

	nouUsuari.save(err, newUser).then(function(){
		if (err) return res.status(500).send({ message: `Error al guardar les dades del nou usuari: ${err}`})
		
		res.status(200).send({ message: `Dades nou usuari guardades: ${newUser}` })
	})
}


function deleteUser(req, res) {
	let userId = req.params.userId
	User.findById(userId, (err, user) => {
		if (err) return res.status(500).send({message: "hi ha hagut un error al trobar l'usuari"})

		user.remove(err, () => {
			if (err) return res.status(500).send({ message: "hi ha hagut un error a l'eliminar l'usuari"})

			res.status(200).send({ message: "usuari eliminat"})
		})
	})
}


module.exports = {
	getUser,
	getUsers,
	updateUser,
	newUser,
	deleteUser
}