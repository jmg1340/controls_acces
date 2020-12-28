'use strict'

const mongoose = require("mongoose")


const userSchema = mongoose.Schema({

	nom: String,
	pwd: String

})


module.exports = mongoose.model('Usuari', userSchema)