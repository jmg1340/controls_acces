<template>
      <q-card class="q-dialog-plugin">
        
        <q-card-section>
          <div class="text-h6">Usuari</div>
        </q-card-section>

        <q-card-section>
          <q-input type="text" autofocus label="Numero" v-model="numero_" />
          <q-input type="text" label="Nom" v-model="nom_" />
        </q-card-section>


        <q-card-section>
          <cmp_Traxs 
            :traxsPersona="traxAssignats_"
            @eventSeleccio="accioRecepcioSeleccio"
          >
          </cmp_Traxs>
        </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" label="OK" @click="onOKClick" />
          <q-btn color="primary" label="Cancelar" @click="onCancelClick" />
        </q-card-actions>
        

      </q-card>
</template>


<script>
import { mapState, mapActions} from 'vuex';
import cmp_Traxs from "./cTraxsAssignats";

export default {
  // name: 'ComponentName',
  props: ['objPersonaPag'],  // objecte amb tota la informació de la persona que editem. Cas de que sigui un nou usuari el valor sera 'null'

  components:{cmp_Traxs},

  beforeMount () {
    console.log("Estic a BEFOREMOUNT del cFormPersonal");
  	console.log(this.objPersonaPag)
    // En el cas de que estiguem modificant informacio d'una persona, establim els valors a les variables locals del component
    if (this.objPersonaPag != null) {
    	this.nom_    = this.objPersonaPag.nom,
    	this.numero_ = this.objPersonaPag.numero,
      this.traxAssignats_ = this.objPersonaPag.traxs
  	}
  },

  data () {
    return {
    	nom_: '',
    	numero_: '',
      traxAssignats_: []
    }
  },

  methods: {
  	...mapActions('objModulPersonal',[
  	    'actAfegirPersonal',
        'actModificarPersonal'
  	]),

    /**
      METODE: accioRecepcioSeleccio
      FUNCIONALITAT: modifica els traxs de la persona (variable local ubicAssignades d'aquest component) conforme es marquin o desmarquin en el component cTraxsAssignades
    */
    accioRecepcioSeleccio: function(arrSeleccio){
      console.log("estic al method ACCIORECEPCIOSELECCIO !!")
      this.traxAssingats_ = arrSeleccio;
    },

  	onOKClick: function () {

      console.log("rececpio strings traxs seleccionats: " + this.traxAssingats_)

      if ( this.numero_.length == 0  ||  this.nom_.length == 0) {
        this.$q.dialog({
          title: 'ALERTA',
          message: 'Falta NUMERO o NOM',
          cancel: false,
          persistent: true,
          color: "red"
        })

        return
      }


      let objPersona = {
        numero: this.numero_,
        nom: this.nom_,
        traxs: this.traxAssingats_
        //cognoms: this.cognom_
      };

      

      if ( this.objPersonaPag == null ){

        console.log("boto 'OK' per a CREACIO registre");
        console.log("objPersona: " + JSON.stringify(objPersona));

    		this.actAfegirPersonal(objPersona)
    		.then( (registreAfegit) => {
    			console.log("Registre afegit: " + registreAfegit);
  	  		
          console.log("this.numero = " + this.numero);
  	  		this.numero_ = null;
  	  		this.nom_    = null;
          this.traxAssingats_ = []
  	  		//this.cognom_ = null;

    			this.$emit('eventMostrar', {queMostrar: 'llista', objPers: null} );
    		})
    		.catch( (msgError) => {
  	      this.$q.dialog({
  	        title: 'Alerta',
  	        message: msgError
  	      }).onOk(() => {
  	        //console.log('OK')
  	      }).onCancel(() => {
  	        //console.log('Cancel')
  	      }).onDismiss(() => {
  	        //console.log('I am triggered on both OK and Cancel')
  	      })
    		});


      } else{
        
        console.log("boto 'OK' per a MODIFICACIO registre");

        objPersona.id = this.objPersonaPag._id;

        this.actModificarPersonal(objPersona)
        .then( (registreModificat) => {
          console.log("Registre modificat: " + registreModificat);
          
          this.numero_ = null;
          this.nom_    = null;
          this.traxAssingats_ = []
          //this.cognom_ = null;

          this.$emit('eventMostrar', {queMostrar: 'llista', objPers: null} );
        })
        .catch(  (msgError) => {
          this.$q.dialog({
            title: 'Alerta',
            message: msgError
          }).onOk(() => {
            //console.log('OK')
          }).onCancel(() => {
            //console.log('Cancel')
          }).onDismiss(() => {
            //console.log('I am triggered on both OK and Cancel')
          })
        });


      }
  		
  	},


  	onCancelClick() {
  		this.numero_ = null;
  		this.nom_    = null;
  		//this.cognom_ = null;

  		this.$emit('eventMostrar', {queMostrar: 'llista', objPers: null} );
  	}
  }


}
</script>

<style>
</style>
