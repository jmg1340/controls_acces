<template>
  <!-- <div class="row q-mb-lg">
 -->
    <q-dialog ref="dialog" @hide="onDialogHide" >
      <q-card class="q-dialog-plugin">
        
        <q-card-section>
          <div class="text-h6">Nou usuari</div>
        </q-card-section>

        <q-card-section>
        	<q-input type="text" autofocus float-label="Numero" v-model="numero_" />
        	<q-input type="text" float-label="Nom" v-model="nom_" class="q-ml-md"/>
        	<q-input type="text" float-label="Cognom" v-model="cognom_" />

         	<!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
        </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" label="OK"     @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>


      </q-card>
    </q-dialog>



  <!-- </div> -->
</template>

<script>
import { mapState, mapActions} from 'vuex';

export default {
  // name: 'ComponentName',
  props:[ 'numero_', 'nom_', 'cognom_' ],

  data () {
    return {

      //obrirDialeg: false

    }
  },

  methods: {
  	...mapActions('objModulPersonal',[
  	    'actAfegirPersonal',
        'actMostrarFormulari'
  	  ]),



    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      this.hide()
    },
    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    },


/*
  	submit: function(){
  		let objPersona = {
  			numero: this.numero,
  			nom: this.nom,
  			cognom: this.cognom
  		};

  		this.actAfegirPersonal(objPersona);
  		
  		this.numero = null;
  		this.nom = null;
  		this.cognom = null;

      this.actMostrarFormulari(false);

  	}

*/


  },

  computed: {
  	//...mapState('objModulPersonal', {

      activarForm: {

        get() {
          console.log("**** GEEET ****")
          //console.log(this.$store.activateDialog)
          //return this.$store.state.activateDialog
          // return state => {
          //   //console.log("state.objModulPersonal.activateDialog: " + state.objModulPersonal.activateDialog)
          //   state.activateDialog
          // }
          return this.$store.state.objModulPersonal.activateDialog
        },
        set(nouValor) {
          this.$store.commit('mutMostrarFormulari', nouValor)
          // this.actMostrarFormulari(nouValor)
          // this.$store.dispatch('objModulPersonal/actMostrarFormulari', nouValor)
        }

      }
      
	  //})

  },

  watch: {
    obrirDialeg: function(newValue, oldValue){
      console.log("**** obrirDialeg: " + newValue);
    }
  }	


}
</script>

<style>
</style>
