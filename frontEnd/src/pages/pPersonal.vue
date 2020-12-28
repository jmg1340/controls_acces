<template>
  <q-page padding class="flex items-start justify-center">
    

    <cmp_llistaPersonal 
      v-if="mostrar == 'llista'" 
      v-on:eventMostrar="accioMostrar">
    </cmp_llistaPersonal>
    
    <cmp_formPersonal 
      :objPersonaPag="objPers"
      v-if="mostrar == 'formulari'" 
      v-on:eventMostrar="accioMostrar">
    </cmp_formPersonal>


  </q-page>
</template>

<script>
import cmp_llistaPersonal from "components/personal/cLlista";
import cmp_formPersonal from "components/personal/cFormPersonal";


export default {
  // name: 'PageName',
	components: {cmp_llistaPersonal, cmp_formPersonal},

	data(){
		return {
      mostrar: "llista", // variable per mostrar la llista o el formulari
      objPers: null   // variable utilitzada per passar al component cFormPersonal les dades de la persona quan son editades. Si valor = null, vol dir que es tracta d'una nova persona.
		}
	},

	methods:{

    /**
      METODE: accioMostrar
      FUNCIONALITAT: accio de mostrar el formulari o la llista de personal

      Aquesta acció es cridada des dels components cLlista o cFormPersonal
    */
    accioMostrar: function (objPayload) {
      console.log("objPayload: " + JSON.stringify(objPayload));
      this.objPers = objPayload.objPers;
      this.mostrar = objPayload.queMostrar;
      console.log("this.mostrar =  " + this.mostrar);
    
    }

	}

}
</script>

<style>
</style>
