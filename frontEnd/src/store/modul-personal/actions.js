
import Vue from 'vue';


/**
	Recupera de MongoDB la llista amb la informació del personal i la guarda a state.objModulPersonal.llistaPersonal
*/
export function actLlistarPersonal(context) {

	Vue.prototype.$axios({
	  method: 'get',
	  url: '/personals'
	})
	.then((response) => {
		context.commit("mutLlistarPersonal", response.data.personal);
	})
	.catch((Error) => {
		alert("actLlistarPersonal CATCH. Error: " + Error);
	})
}


/**
	Recupera de MongoDB llista del personal segons una ubicació
*/
export function actLlistarPersonalSegonsUbicacio(context, ubicacio) {

	Vue.prototype.$axios({
	  method: 'get',
	  url: '/personalSegonsUbicacio/' + ubicacio,
	})
	.then((response) => {
		console.log("response: " + JSON.stringify(response));
		context.commit("mutLlistarPersonalSegonsUbicacio", response.data.personal);	})
	.catch((Error) => {
		alert("actLlistarPersonalSegonsUbicacio CATCH. Error: " + Error);
	})
}





/**
AFEGIR NOU PERSONAL A LA BDD 
*/
export function actAfegirPersonal (context, objPersona) {
	console.log("ACTION afegirPersonal. objPersona=" + JSON.stringify(objPersona));

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'post',
		  url: '/nouPersonal',
		  data: objPersona,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirPersonal" + JSON.stringify(response.data));
			context.dispatch("actLlistarPersonal");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirPersonal:\n" + error)
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
export function actModificarPersonal (context, objPersona) {
	console.log("ACTION modificarPersonal. objPersona=" + JSON.stringify(objPersona));

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'put',
		  url: '/modificarPersonal/' + objPersona.id,
		  data: objPersona,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirPersonal" + JSON.stringify(response.data));
			context.dispatch("actLlistarPersonal");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirPersonal:\n" + error)
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
	Elimina el document / objecte persona de MongoDB i actulalitza state.objModulPersonal.llistaPersonal 
*/
export function actEliminarPersonal (context, objPersona) {
	console.log("ACTION eliminarPersonal. objPersona=" + JSON.stringify(objPersona));

	let promise = new Promise( (resolve, reject) => {

		Vue.prototype.$axios({
		  method: 'delete',
		  url: '/eliminarPersonal/' + objPersona._id,
		  data: objPersona,

		})
		.then((response) => {
			context.dispatch("actLlistarPersonal"); // actualitza state.objModulPersonal.llistaPersonal
			resolve(JSON.stringify(response.data))  // response data es el document eliminat de MongoDB
		})
		.catch((error) => {
			reject("Error al modificar registre:\n" + error);
		})

	});

	return promise;

}








/**
AFEGIR NOU PERSONAL A LA BDD 
*/
export function actOperacioBulk (context) {
	console.log("ACTION actOperacioBulk");

	let promise = new Promise( (resolve, reject) => {


		Vue.prototype.$axios({
		  method: 'post',
		  url: '/operacioBulk',
		  //data: objParametres,

		})
		.then((response) => {
			//this.data = response.data
			//console.log("OK actAfegirPersonal" + JSON.stringify(response.data));
			context.dispatch("actLlistarPersonal");

			resolve(JSON.stringify(response.data))
			
		})
		.catch((error) => {
			//console.log("error actAfegirPersonal:\n" + error)
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

