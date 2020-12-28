'use strict'

const Ubicacio = require("../models/ubicacionsTrax")




function getUbicacio (req, res){
	let ubicacioId = req.params.ubicacioId
	Ubicacio.findById(ubicacioId, (err, Ubicacio) => {
		if (err) return   res.status(500).send({ message: `hi ha hagut un error al recuperar les dades del ubicacio: ${ err }` })
		if (!Ubicacio) return res.status(404).send({ message:  `no hi ha cap ubicacio amb id ${ ubicacioId } `})

		res.status(200).send({ message: `ubicacio trobat: ${Ubicacio}`})
	})
}


function getUbicacions(req, res){
	console.log("GET_UBICACIONS")
	Ubicacio.find({}, (err, ubicacio) => {
		if (err) return res.status(500).send({message: `error al recuperar els ubicacio: ${err}`})
		if (! ubicacio) return res.status(404).send({ message: "no s'ha trobat cap ubicacio"})


		res.status(200).send({ ubicacio })
	})	
}


function updateUbicacio(req, res){
	console.log("UPDATE_UBICACIO: dades a modificar: " + JSON.stringify(req.params));
	
	let ubicacioId = req.params.ubicacioId
	let dadesActualitzades = req.body


	Ubicacio.findByIdAndUpdate( ubicacioId, dadesActualitzades)
	.then(function(objPersModificat){
		res.status(200).json({ message: `Dades editades ubicacio guardades: ${objPersModificat}` })
		console.log("DADES MODIFICADES I GUARDADES A LA BDD");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades modificades del ubicacio: ${err}`})
		console.log("ERROR AL GUARDAR LES DADES MODIFICADES:\n " + err);
	})	


}


function newUbicacio (req, res){
	console.log("estic a New Ubicacio");
	console.log(req.body)
	
	let nouUbicacio = new Ubicacio({
		lloc :req.body.lloc,
		carpeta :req.body.carpeta,
	})

	nouUbicacio.save()
	.then(function(objNovaUbicacioGuardada){
		console.log('objNovaUbicacioGuardada: ' + objNovaUbicacioGuardada)
		res.status(200).json({ message: `Dades nou ubicacio guardades: ${objNovaUbicacioGuardada}` })
		console.log("DADES GUARDADES");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades del nou ubicacio: ${err}`})
		console.log("ERROR AL GUARDAR LES DADES:\n " + err);
	})
}


function deleteUbicacio(req, res) {
	let ubicacioId = req.params.ubicacioId

	Ubicacio.findByIdAndRemove(ubicacioId)
	.then(function(objUbicacioEliminat){
		res.status(200).json({ message: `ubicacio eliminat: ${objUbicacioEliminat}` })
		console.log("REGISTRE ELIMINAT");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades del nou ubicacio: ${err}`})
		console.log("ERROR AL ELIMINAR REGISTRE:\n " + err);
	})

/*
	Ubicacio.findById(ubicacioId, (err, Ubicacio) => {
		if (err) return res.status(500).send({message: "hi ha hagut un error al trobar l'ubicacio"})

		Ubicacio.remove(err, () => {
			if (err) return res.status(500).send({ message: "hi ha hagut un error a l'eliminar l'ubicacio"})

			res.status(200).send({ message: "ubicacio eliminat"})
		})
	})
*/


}


module.exports = {
	getUbicacio,
	getUbicacions,
	updateUbicacio,
	newUbicacio,
	deleteUbicacio
}