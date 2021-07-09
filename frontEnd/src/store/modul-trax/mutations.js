/*
export function someMutation (state) {
}
*/

// ========== TRAX =========
export function mutLlistarTraxs (context, llistaDeLaBDD) {
	// console.log("MUTATION llistarTraxs:\n" + JSON.stringify(llistaDeLaBDD));
	context.llistaTraxs = llistaDeLaBDD;
};

