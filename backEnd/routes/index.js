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
router.get("/personalSegonsUbicacio/:ubicacio", personalController.getPersonalSegonsUbicacio)	// solicitud per mostrar totes les persones que pertanyen a una ubicacio
router.get("/personal/:personalId", personalController.getPersonal) 		// solicitud per mostrar un personal
router.post("/nouPersonal", personalController.newPersonal)		// solicitud per afegir un nou personal
router.put("/modificarPersonal/:personalId", personalController.updatePersonal)	// solicitud per modificar dades d'un personal
router.delete("/eliminarPersonal/:personalId", personalController.deletePersonal)


const ubicacionsController = require ("../controllers/ubicacionsTrax")

router.get("/ubicacions", ubicacionsController.getUbicacions)	// solicitud per mostrar tots les ubicacions
router.get("/personal/:ubicacioId", ubicacionsController.getUbicacio) 		// solicitud per mostrar un Ubicacio
router.post("/nouUbicacio/", ubicacionsController.newUbicacio)		// solicitud per afegir un nou Ubicacio
router.put("/modificarUbicacio/:ubicacioId", ubicacionsController.updateUbicacio)	// solicitud per modificar dades d'un Ubicacio
router.delete("/eliminarUbicacio/:ubicacioId", ubicacionsController.deleteUbicacio)







module.exports = router
