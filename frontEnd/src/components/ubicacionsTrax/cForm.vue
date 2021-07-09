<template>
      <q-card class="">
        
        <q-card-section>
          <div class="text-h6">Ubicació</div>
        </q-card-section>

        <q-card-section>
          <q-input type="text" autofocus label="Lloc" v-model="lloc_" />
          <q-input type="text" label="Carpeta" v-model="carpeta_" />

         	<!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
        </q-card-section>


        <q-card-section>
          <cmp_PersonalTrax :lloc="lloc_"></cmp_PersonalTrax>
        </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" label="OK"     @click="onOKClick" />
          <q-btn color="primary" label="Cancelar" @click="onCancelClick" />
        </q-card-actions>


      </q-card>
</template>


<script>
import { mapState, mapActions} from 'vuex';
import cmp_PersonalTrax from "./cLlistaPersonalTraxs";

export default {
  // name: 'ComponentName',
  components:{cmp_PersonalTrax},

  props: ['objTraxPag'],

  beforeMount () {
    console.log("Estic a BEFOREMOUNT del cFormTrax");
    console.log("objTraxPag:");
    console.log(this.objTraxPag);
		
  	if (this.objTraxPag != null) {
      this.lloc_ = this.objTraxPag.lloc;
      this.carpeta_ = this.objTraxPag.carpeta;
  	}
  },

  data () {
    return {
    	lloc_: null,
      carpeta_: null
    }
  },

  methods: {
  	...mapActions('objModulTrax',[
  	    'actAfegirTrax',
        'actModificarTrax'
  	]),



  	onOKClick: function () {

      let objTrax = {
        lloc: this.lloc_,
        carpeta: this.carpeta_
      };

      

      if ( this.objTraxPag == null ){

    		this.actAfegirTrax(objTrax)
    		.then( (registreAfegit) => {
    			console.log("Registre afegit: " + registreAfegit);
  	  		
          console.log("this.lloc = " + this.lloc);
  	  		this.lloc_ = null;
          this.carpeta_ = null;

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
        
        console.log("BOTO 'OK' PER A MODIFICACIO REGISTRE");

        objTrax.id = this.objTraxPag._id;

        this.actModificarTrax(objTrax)
        .then( (registreModificat) => {
          console.log("Registre modificat: " + registreModificat);
          
          this.lloc_ = null;
          this.carpeta_ = null;

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
  		this.lloc_ = null;
      this.carpeta_ = null;

  		this.$emit('eventMostrar', {queMostrar: 'llista', objPers: null} );
  	}
  }


}
</script>

<style>
</style>
