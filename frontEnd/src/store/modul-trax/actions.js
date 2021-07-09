
import Vue from 'vue';


/**
CARREGA DE ARRAYS DE LA BDD 
Carrega de array "llistesTrax", "llistesBlanques", "assignacions" i "llistaTrax"
*/

export function actLlistarTraxs(context) {
	//console.log("modul UBICACIONS action 'actLlistarTraxs' FORA DE LA PROMESA");
	
	let promise = new Promise( (resolve, reject) => {
		Vue.prototype.$axios({
		  method: 'get',
		  url: '/trax',
		})
		.then((response) => {
			console.log("modul TRAX action 'actLlistarTRAXs' RESOLVE");
			console.log(response.data.trax)
			context.commit("mutLlistarTraxs", response.data.trax);
			resolve()
		})
		.catch(() => {
			reject("actLlistarTraxs CATCH. Error: " + Error)
		})

	});

	return promise;
}





/**
AFEGIR NOVA UBICACIO
*/
export function actAfegirTrax (context, objTrax) {
	console.log("ACTION afegirTrax. objTrax=" + objTrax);

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'post',
		  url: '/nouTrax',
		  data: objTrax,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirTrax" + JSON.stringify(response.data));
			context.dispatch("actLlistarTraxs");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirTrax:\n" + error)
			reject("Error a l'afegir registre:\n" + error);
			// this.$q.notify({
			// 	color: 'negative',
			// 	position: 'top',
			// 	message: "No s'ha pogut afegir el nou treballador",
			// 	icon: 'report_problem'
			// })
		})


	});

	return promise;


}





/**
MODIFICAR REGISTRE 
*/
export function actModificarTrax (context, objTrax) {
	console.log("ACTION modificarTrax. objTrax=" + objTrax);

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'put',
		  url: '/modificarTrax/' + objTrax.id,
		  data: objTrax,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirTrax" + JSON.stringify(response.data));
			context.dispatch("actLlistarTraxs");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirTrax:\n" + error)
			reject("Error al modificar registre:\n" + error);
			// this.$q.notify({
			// 	color: 'negative',
			// 	position: 'top',
			// 	message: "No s'ha pogut afegir el nou treballador",
			// 	icon: 'report_problem'
			// })
		})


	});

	return promise;

}




/**
ELIMINAR REGISTRE 
*/
export function actEliminarTrax (context, objTrax) {
	console.log("ACTION eliminarTrax. objTrax=" + JSON.stringify(objTrax));

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'delete',
		  url: '/eliminarTrax/' + objTrax._id,
		  data: objTrax,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirTrax" + JSON.stringify(response.data));
			context.dispatch("actLlistarTraxs");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirTrax:\n" + error)
			reject("Error al modificar registre:\n" + error);
			// this.$q.notify({
			// 	color: 'negative',
			// 	position: 'top',
			// 	message: "No s'ha pogut afegir el nou treballador",
			// 	icon: 'report_problem'
			// })
		})


	});

	return promise;

}


