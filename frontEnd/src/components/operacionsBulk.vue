<!-- 
 Al final no utilitzo aquest component, sino que faig un boto a la mateixa pagina index
 -->

<template>


  <q-card class="q-dialog-plugin">
    
    <q-card-section>
      <div class="text-h6">Operacions BULK</div>
    </q-card-section>

    <q-card-section>
      <q-input type="text" autofocus label="Coleccio" v-model="coleccio" />
      <q-input type="text" label="fitxer" v-model="fitxer" />

     	<!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
    </q-card-section>


    <q-card-actions align="right" class="text-primary">
      <q-btn color="primary" label="OK"     @click="onOKClick" />
      <!-- <q-btn color="primary" label="Cancelar" @click="onCancelClick" /> -->
    </q-card-actions>


  </q-card>

</template>

<script>
import { mapActions} from 'vuex';


export default {
  // name: 'ComponentName',
  data () {
    return {
    	coleccio: null,
    	fitxer: null
    }
  },

  methods: {
  	...mapActions('objModulPersonal',[
  	    'actOperacioBulk',
  	]),



  	onOKClick: function () {

 
        
		console.log("BOTO 'OK' PER A OPERACIO BULK");

		objParametres = {
			coleccio: this.coleccio,
			fitxer: this.fitxer
		}

		this.actOperacioBulk(objParametres)
		.then( (objBulkResultat) => {
		  console.log("Operacio Bulk feta");
		  this.$q.dialog({
		    title: 'Resultat',
		    message: JSON.stringify(objBulkResultat)
		  }).onOk(() => {
		    //console.log('OK')
		  }).onCancel(() => {
		    //console.log('Cancel')
		  }).onDismiss(() => {
		    //console.log('I am triggered on both OK and Cancel')
		  })
		  

		})
		.catch(  (msgError) => {
		  this.$q.dialog({
		    title: 'Error operació Bulk',
		    message: msgError
		  }).onOk(() => {
		    //console.log('OK')
		  }).onCancel(() => {
		    //console.log('Cancel')
		  }).onDismiss(() => {
		    //console.log('I am triggered on both OK and Cancel')
		  })
		});


  		
  	},


}
</script>

<style>
</style>
