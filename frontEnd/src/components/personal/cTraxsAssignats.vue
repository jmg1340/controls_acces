<template>

    <q-table
      title="Trax assignats"
      :data="traxs"
      :columns="columns"
      row-key="lloc"

      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      
      selection="multiple"
      :selected.sync="selected"
      :selected-rows-label="enviarArrayElementsSeleccionats"

      width="75%"
      class="my-sticky-header-table"
      dense
      flat
      dark
      
    >
    </q-table>


</template>

<script>
import { mapState, mapActions} from 'vuex';

export default {

  name: 'cTraxAssignats',

  props:['traxsPersona'],

  created: function(){
    //console.log("Estic a CREATE del component cTraxAssignades")
    this.actLlistarTraxs()
    .then(() => {
      console.log("action 'actLlistarTraxs' completada");
      this.marcarTraxPersona()
    })
    .catch(function(error){
      console.log(error)
    })
    
  },

  data() {
    return {
/*
    	traxs_: [
    		{ lloc: "AAAAA", id_: 1},
    		{ lloc: "BBBBB", id_: 2},
    		{ lloc: "CCCCC", id_: 3},
    		{ lloc: "DDDDD", id_: 4},
    	],
*/
      selected: [],

      pagination: {
         rowsPerPage: 0
      },      
    	
      columns:
    	[
	        {
	          name: 'lloc',
	          required: true,
	          label: 'LLOC',
	          align: 'left',
	          field: 'lloc',
	          sortable: true,
	          //classes: 'my-class',
	          style: 'width: 50px'
	        }
    	]

    };
  },


  computed: {
    ...mapState({
      traxs: state => state.objModulTrax.llistaTraxs
    })
  },

  methods:{
    ...mapActions('objModulTrax',[
        'actLlistarTraxs',
    ]),



    /** 
      METODE: marcarTraxPersona
      FUNCIONALITAT: al mostrar la llista de les traxs, marca automaticament les traxs que la persona te assignades (a MongoDB).

      'traxs' es array d'objectes (cada ubicacio es un objecte) del tipus:
      __index:3
      __v:0
      _id:"5d14a376fe1974155da05090"
      carpeta:"T4"
      lloc:"Gran Hermano"

      Per tant, per cada item (string) del array 'traxsPersona' hem de trobar l'objecte del array 'traxs' segons la propietat lloc i afegir-lo al array 'selected'
    */
    marcarTraxPersona: function(){

      // traxsPersona: array de strings (ve del component cFormPersonal)
      // traxs: array d'objectes de les traxs (state.objModulTrax.llistaTrax)

			console.log("Estic a marcarTRAXPersona")
			console.log(this.traxs)
			console.log(this.traxsPersona)

      for(let i=0; i<this.traxsPersona.length; i++){
        for(let j=0; j<this.traxs.length; j++){
          
          if(this.traxsPersona[i] == this.traxs[j].lloc){
            this.selected.push(this.traxs[j])
            console.log('objecte marcat: ' + JSON.stringify(this.traxs[j]));
          }
        
        }
      }
    
    },



    /**
      METODE: enviarArrayElementsSeleccionats
      FUNCIONALITAT: cada vegada que es marca o desmarca una ubicacio, s'executa aquest metode. El que fa es crear  arrSeleccio i omplir-la amb array de les ubicacion marcades -strings-.
      Un cop omplerta, arrSeleccio s'envia al component cFormPersonal per a que substitueixi la seva variable local corresponent amb el valor de arrSeleccio.
    */
    enviarArrayElementsSeleccionats: function(detalls){

      let arrSeleccio = []

      for(let i=0; i<this.selected.length; i++){
        arrSeleccio.push(this.selected[i].lloc)
      }

      this.$emit("eventSeleccio", arrSeleccio)

    }


  }

};
</script>

<style lang="css" scoped>


 .my-sticky-header-table .q-table__top  {
    color: red;
    background-color: #c1f4cd;
 } 



</style>
