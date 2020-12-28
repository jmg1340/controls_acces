/*
export function someMutation (state) {
}
*/

// ========== PERSONAL =========
export function mutLlistarUbicacions (context, llistaDeLaBDD) {
	//console.log("MUTATION llistarUbicacions:\n" + JSON.stringify(llistaDeLaBDD));
	context.llistaUbicacions = llistaDeLaBDD;
};

