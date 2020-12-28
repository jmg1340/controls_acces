'use strict'

const mongoose = require("mongoose")

const ubicacionsSchema = mongoose.Schema({
	lloc: {
		type: String,
/*		
		enum: [
			"administracio", 
			"uca", 
			"hhcc", 
			"informatica", 
			"sala reunions P-2",
			"GH",
			"Vestuari masculi",
			"Vestuari femeni",
			"Quirofan",
			"Esterilitzacio",
			"Farmacia",
			"Manteniment"
		]
*/
	},
	carpeta: String
})


module.exports = mongoose.model("ubicacioTrax", ubicacionsSchema)