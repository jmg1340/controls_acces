'use strict'

const Personal = require("../models/personal")
const fitxer = require ('../fitxers/obj.js');

function operacioBulk (req, res){
	console.log("estic al controller operacioBulk");
	
	const arrayObj = fitxer.arrayObj();
	console.log("arrayObj.length: " + arrayObj.length);
	
	//console.log(req.body)
	
	//let fitxer = req.body.fitxer;
	//let coleccio = req.body.coleccio;

	new Promise(function(resolve, reject){
		var bulk = Personal.collection.initializeUnorderedBulkOp();
		console.log("var bulk= " + bulk);
		
		for(let i = 0; i < arrayObj.length; i++){
			console.log(JSON.stringify(arrayObj[i]));
			bulk.insert( arrayObj[i] );
		
			if(i == arrayObj.length - 1) return resolve(bulk);
		}

	})
	.then (function(bulk){
		bulk.execute()
		.then(function(objResultatBulk){
			res.status(200).json({ message: `Operacio Bulk satiscfactoria ${objResultatBulk}` })
			console.log("Operacio BULK OK !!");
			//return;
		})
		.catch (function(err){
			res.status(500).json({ message: `Error operació Bulk: ${err}`})
			console.log("ERROR operacio Bulk:\n " + err);
		})

	})
	.catch (function(err){
		console.log("ERROR operacions previes al Bulk.exectue:\n " + err);
		res.status(500).json({ message: `Error operació previa al Bulk.execute: ${err}`})
	})




}





function getPersonal (req, res){
	let personalId = req.params.personalId
	Personal.findById(personalId, (err, Personal) => {
		if (err) return   res.status(500).send({ message: `hi ha hagut un error al recuperar les dades del personal: ${ err }` })
		if (!Personal) return res.status(404).send({ message:  `no hi ha cap personal amb id ${ personalId } `})

		res.status(200).send({ message: `personal trobat: ${Personal}`})
	})
}


function getPersonals(req, res){
	console.log("GET_PERSONALS")
	Personal.find({}, (err, personal) => {
		if (err) return res.status(500).send({message: `error al recuperar els personal: ${err}`})
		if (! personal) return res.status(404).send({ message: "no s'ha trobat cap personal"})


		res.status(200).send({ personal })
	})	
}

function getPersonalSegonsTrax(req, res){
	console.log("GET_PERSONAL_SEGONS_UBICACIO")
	console.log("req.params.ubicacio: " + req.params.ubicacio);
	
	let objCriteri;
	if (req.params.trax == "Tothom (NO afegir personal)") {
		objCriteri = {}
	} else {
		objCriteri = {traxs: req.params.trax}
	}

	Personal.find(
		objCriteri,
		{numero: 1, nom: 1, _id: 0}, (err, personal) => {
		if (err) return res.status(500).send({message: `error al recuperar els personal: ${err}`})
		if (! personal) return res.status(404).send({ message: "no s'ha trobat cap personal"})


		res.status(200).send({ personal })
	})	
}


function updatePersonal(req, res){
	console.log("UPDATE_PERSONAL:\n\t req.params: " + JSON.stringify(req.params) + "\n\t req.body: " + JSON.stringify(req.body));
	
	let personalId = req.params.personalId
	let dadesActualitzades = req.body


	Personal.findByIdAndUpdate( personalId, dadesActualitzades)
	.then(function(objPersModificat){
		res.status(200).json({ message: `Dades editades personal guardades: ${objPersModificat}` })
		console.log("DADES MODIFICADES I GUARDADES A LA BDD");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades modificades del personal: ${err}`})
		console.log("ERROR AL GUARDAR LES DADES MODIFICADES:\n " + err);
	})	


}


function newPersonal (req, res){
	console.log("estic a New Personal");
	console.log(req.body)
	
	let nouPersonal = new Personal(req.body)

	nouPersonal.save()
	.then(function(objNouPersGuardat){
		res.status(200).json({ message: `Dades nou personal guardades: ${objNouPersGuardat}` })
		console.log("DADES GUARDADES");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades del nou personal: ${err}`})
		console.log("ERROR AL GUARDAR LES DADES:\n " + err);
	})
}


function deletePersonal(req, res) {
	let personalId = req.params.personalId

	Personal.findByIdAndRemove(personalId)
	.then(function(objPersonalEliminat){
		res.status(200).json({ message: `personal eliminat: ${objPersonalEliminat}` })
		console.log("REGISTRE ELIMINAT");
		//return;
	})
	.catch (function(err){
		res.status(500).json({ message: `Error al guardar les dades del nou personal: ${err}`})
		console.log("ERROR AL ELIMINAR REGISTRE:\n " + err);
	})

/*
	Personal.findById(personalId, (err, Personal) => {
		if (err) return res.status(500).send({message: "hi ha hagut un error al trobar l'personal"})

		Personal.remove(err, () => {
			if (err) return res.status(500).send({ message: "hi ha hagut un error a l'eliminar l'personal"})

			res.status(200).send({ message: "personal eliminat"})
		})
	})
*/


}


module.exports = {
	operacioBulk,
	getPersonal,
	getPersonals,
	getPersonalSegonsTrax,
	updatePersonal,
	newPersonal,
	deletePersonal
}