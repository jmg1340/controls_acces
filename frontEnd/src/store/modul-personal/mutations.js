/*
export function someMutation (state) {
}
*/

// ========== PERSONAL =========
export function mutLlistarPersonal (context, llistaDeLaBDD) {
	//console.log("MUTATION llistarPersonal:\n" + JSON.stringify(llistaDeLaBDD));
	context.llistaPersonal = llistaDeLaBDD;
};

export function mutLlistarPersonalSegonsUbicacio (context, llistaDeLaBDD) {
	//console.log("MUTATION llistarPersonal:\n" + JSON.stringify(llistaDeLaBDD));
	context.llistaPesonalUbicacio = llistaDeLaBDD;
};

