'use strict'

const Trax = require("../models/trax")




function getTrax (req, res){
	let traxId = req.params.traxId
	Trax.findById(traxId, (err, Trax) => {
		if (err) return   res.status(500).send({ message: `hi ha hagut un error al recuperar les dades del trax: ${ err }` })
		if (!Trax) return res.status(404).send({ message:  `no hi ha cap trax amb id ${ traxId } `})

		res.status(200).send({ message: `trax trobat: ${Trax}`})
	})
}


function getTraxs(req, res){
	console.log("GET_TRAXS")
	Trax.find({}, (err, trax) => {
		if (err) return res.status(500).send({message: `error al recuperar els trax: ${err}`})
		if (! trax) return res.status(404).send({ message: "no s'ha trobat cap trax"})


		res.status(200).send({ trax })
	})	
}


function updateTrax(req, res){
	console.log("UPDATE_UBICACIO: dades a modificar: " + JSON.stringify(req.params));
	
	let traxId = req.params.traxId
	let dadesActualitzades = req.body


	Trax.findByIdAndUpdate( traxId, dadesActualitzades)
	.then(function(objPersModificat){
		res.status(200).json({ message: `Dades editades trax guardades: ${objPersModificat}` })
		console.log("DADES MODIFICADES I GUARDADES A LA BDD");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades modificades del trax: ${err}`})
		console.log("ERROR AL GUARDAR LES DADES MODIFICADES:\n " + err);
	})	


}


function newTrax (req, res){
	console.log("estic a New Trax");
	console.log(req.body)
	
	let nouTrax = new Trax({
		lloc :req.body.lloc,
		carpeta :req.body.carpeta,
	})

	nouTrax.save()
	.then(function(objNovaTraxGuardada){
		console.log('objNovaTraxGuardada: ' + objNovaTraxGuardada)
		res.status(200).json({ message: `Dades nou trax guardades: ${objNovaTraxGuardada}` })
		console.log("DADES GUARDADES");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades del nou trax: ${err}`})
		console.log("ERROR AL GUARDAR LES DADES:\n " + err);
	})
}


function deleteTrax(req, res) {
	let traxId = req.params.traxId

	Trax.findByIdAndRemove(traxId)
	.then(function(objTraxEliminat){
		res.status(200).json({ message: `trax eliminat: ${objTraxEliminat}` })
		console.log("REGISTRE ELIMINAT");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades del nou trax: ${err}`})
		console.log("ERROR AL ELIMINAR REGISTRE:\n " + err);
	})

/*
	Trax.findById(traxId, (err, Trax) => {
		if (err) return res.status(500).send({message: "hi ha hagut un error al trobar l'trax"})

		Trax.remove(err, () => {
			if (err) return res.status(500).send({ message: "hi ha hagut un error a l'eliminar l'trax"})

			res.status(200).send({ message: "trax eliminat"})
		})
	})
*/


}


module.exports = {
	getTrax,
	getTraxs,
	updateTrax,
	newTrax,
	deleteTrax
}