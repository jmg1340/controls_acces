<template>
  <q-page padding class="flex items-start justify-center">
    
<!--     <q-modal v-model="activarForm">
    	<q-btn color="primary" @click="activarForm = false" label="Tancar" />
    	<!- <cmp_formUbicacions /> ->
    </q-modal>	
 -->    

    <cmp_llistaUbicacions 
      v-if="mostrar == 'llista'" 
      v-on:eventMostrar="accioMostrar">
    </cmp_llistaUbicacions>
    
    <cmp_formUbicacions 
      :objTraxPag="objTrax"
      v-if="mostrar == 'formulari'" 
      v-on:eventMostrar="accioMostrar">
    </cmp_formUbicacions>
   <!-- <q-btn color="secondary" @click="obrirFormulari" label="Nou usuari" /> -->



  </q-page>
</template>

<script>
import cmp_llistaUbicacions from "components/ubicacionsTrax/cLlista";
import cmp_formUbicacions from "components/ubicacionsTrax/cForm";


export default {
  // name: 'PageName',
	components: {cmp_llistaUbicacions, cmp_formUbicacions},

	data(){
		return {
			//showAddForm: false
      mostrar: "llista",
      objTrax: null
		}
	},

	methods:{
    accioMostrar: function (objPayload) {
      console.log("objPayload: " + JSON.stringify(objPayload));
      this.objTrax = objPayload.objTrax;
      this.mostrar = objPayload.queMostrar;
      console.log("this.mostrar =  " + this.mostrar);
    
    }

    // obrirFormulari: function() {
    //   console.log("estic a OBRIR FORMULARI");
    //   this.showAddForm = true;
    // }

	}

}
</script>

<style>
</style>
