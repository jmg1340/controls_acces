
import Vue from 'vue';


/**
CARREGA DE ARRAYS DE LA BDD 
Carrega de array "llistesUbicacio", "llistesBlanques", "assignacions" i "llistaTrax"
*/

export function actLlistarUbicacions(context) {
	//console.log("modul UBICACIONS action 'actLlistarUbicacions' FORA DE LA PROMESA");
	
	let promise = new Promise( (resolve, reject) => {
		//console.log("modul UBICACIONS action 'actLlistarUbicacions' DINS DE LA PROMESA");
		Vue.prototype.$axios({
		  method: 'get',
		  url: '/ubicacions',
		})
		.then((response) => {
			resolve()
			//console.log("modul UBICACIONS action 'actLlistarUbicacions' RESOLVE");
			context.commit("mutLlistarUbicacions", response.data.ubicacio);
			// for (objUbicacio in response.llista) {
			// 	context.commit("mutAfegirUbicacio", objUbicacio);
			// }
			
		})
		.catch(() => {
			reject("actLlistarPersonal CATCH. Error: " + Error)
		})

	});

	return promise;
}





/**
AFEGIR NOVA UBICACIO
*/
export function actAfegirUbicacio (context, objUbicacio) {
	console.log("ACTION afegirUbicacio. objUbicacio=" + objUbicacio);

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'post',
		  url: '/nouUbicacio',
		  data: objUbicacio,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirUbicacio" + JSON.stringify(response.data));
			context.dispatch("actLlistarUbicacions");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirUbicacio:\n" + error)
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
export function actModificarUbicacio (context, objUbicacio) {
	console.log("ACTION modificarUbicacio. objUbicacio=" + objUbicacio);

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'put',
		  url: '/modificarUbicacio/' + objUbicacio.id,
		  data: objUbicacio,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirUbicacio" + JSON.stringify(response.data));
			context.dispatch("actLlistarUbicacions");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirUbicacio:\n" + error)
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
export function actEliminarUbicacio (context, objUbicacio) {
	console.log("ACTION eliminarUbicacio. objUbicacio=" + JSON.stringify(objUbicacio));

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'delete',
		  url: '/eliminarUbicacio/' + objUbicacio._id,
		  data: objUbicacio,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirUbicacio" + JSON.stringify(response.data));
			context.dispatch("actLlistarUbicacions");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirUbicacio:\n" + error)
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


