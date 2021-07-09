'use strict'

const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")


router.get("/usuaris", userController.getUsers)	// solicitud per mostrar tots els usuaris
router.get("/usuari/:userId", userController.getUser) 		// solicitud per mostrar un usuari
router.post("/nouUsuari/", userController.newUser)		// solicitud per afegir un nou usuari
router.put("/modificarUsuari/:userId", userController.updateUser)	// solicitud per modificar dades d'un usuari
router.delete("/eliminarUsuari/:userId", userController.deleteUser)


const personalController = require ("../controllers/personal")
router.post("/operacioBulk", personalController.operacioBulk)

router.get("/personals", personalController.getPersonals)	// solicitud per mostrar tots els personals
router.get("/personalSegonsTrax/:trax", personalController.getPersonalSegonsTrax)	// solicitud per mostrar totes les persones que pertanyen a una ubicacio
router.get("/personal/:personalId", personalController.getPersonal) 		// solicitud per mostrar un personal
router.post("/nouPersonal", personalController.newPersonal)		// solicitud per afegir un nou personal
router.put("/modificarPersonal/:personalId", personalController.updatePersonal)	// solicitud per modificar dades d'un personal
router.delete("/eliminarPersonal/:personalId", personalController.deletePersonal)


const ubicacionsController = require ("../controllers/trax")

router.get("/trax", ubicacionsController.getTraxs)	// solicitud per mostrar tots els Trax
router.get("/personal/:traxId", ubicacionsController.getTrax) 		// solicitud per mostrar un Trax
router.post("/nouTrax/", ubicacionsController.newTrax)		// solicitud per afegir un nou Trax
router.put("/modificarTrax/:traxId", ubicacionsController.updateTrax)	// solicitud per modificar dades d'un Trax
router.delete("/eliminarTrax/:traxId", ubicacionsController.deleteTrax)







module.exports = router
