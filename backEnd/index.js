'use strict'

const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

const port = process.env.PORT || 4001

const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
/*
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", 'Origin, Authorization, X-Requested-With, Content-Type, Accept, Cache-Control');
	next();
});
*/

var cors = require('cors');
app.use(cors()) // include before other routes


// ** DIRECCIONAMENT **
const rutes = require("./routes/index")
// rutes.use("/api", rutes)
app.use(rutes)




mongoose.connect("mongodb://localhost:27017/controlsAccessDB", function (error) {
	if (error) throw error
	console.log("\nConnexió amb controlsAccessDB establerta !!")
	
	app.listen(port, () => {
		//console.log("process env" + JSON.stringify(process.env))
		console.log(`Servidor funcionant en el port ${port}`)
	})
})






/*
mongoose.connect("mongodb://localhost:27017/controlsAccessDB", { useNewUrlParser: true }, function (error) {
	if (error) throw error
	console.log("\nConnexió amb controlsAccessDB establerta !!")
	
	app.listen(port, () => {
		//console.log("process env" + JSON.stringify(process.env))
		console.log(`Servidor funcionant en el port ${port}`)
	})

})
*/


/*
mongoose.connect("mongodb://localhost:27017/controlsAccessDB", { useNewUrlParser: true }).then (
	() => {
		console.log("\nConnexió amb controlsAccessDB establerta !!")
		
		app.listen(port, () => {
			//console.log("process env" + JSON.stringify(process.env))
			console.log(`Servidor funcionant en el port ${port}`)
		})
		process.exit(2)
	},
	(err) => {
		if (err) throw err
		process.exit(2)
	}
)
*/


