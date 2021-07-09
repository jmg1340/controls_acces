/*
export function someMutation (state) {
}
*/

// ========== PERSONAL =========
export function mutLlistarPersonal (context, llistaDeLaBDD) {
	//console.log("MUTATION llistarPersonal:\n" + JSON.stringify(llistaDeLaBDD));
	context.llistaPersonal = llistaDeLaBDD;
};

export function mutLlistarPersonalSegonsTrax (context, llistaDeLaBDD) {
	//console.log("MUTATION llistarPersonal:\n" + JSON.stringify(llistaDeLaBDD));
	context.llistaPersonalTrax = llistaDeLaBDD;
};

