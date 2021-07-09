'use strict'

const mongoose = require('mongoose')

const personalSchema = mongoose.Schema({
	
	numero: Number,
	nom: String,
	traxs: Array
	//cognoms: String

})

module.exports = mongoose.model("Personal", personalSchema)