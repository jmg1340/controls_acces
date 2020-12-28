<template>

    <q-table
      title="Ubicacions assignades"
      :data="ubicacions"
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

  name: 'cUbicacionsAssignades',

  props:['ubicacionsPersona'],

  created: function(){
    //console.log("Estic a CREATE del component cUbicacionsAssignades")
    this.actLlistarUbicacions()
    .then(() => {
      console.log("action 'actLlistarUbicacions completada");
      this.marcarUbicacionsPersona()
    })
    .catch(function(error){
      console.log(error)
    })
    
  },

  data() {
    return {
/*
    	ubicacions_: [
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
      ubicacions: state => state.objModulUbicacions.llistaUbicacions
    })
  },

  methods:{
    ...mapActions('objModulUbicacions',[
        'actLlistarUbicacions',
    ]),



    /** 
      METODE: marcarUbicacionsPersona
      FUNCIONALITAT: al mostrar la llista de les ubicacions, marca automaticament les ubicacions que la persona te assignades (a MongoDB).

      'ubicacions' es array d'objectes (cada ubicacio es un objecte) del tipus:
      __index:3
      __v:0
      _id:"5d14a376fe1974155da05090"
      carpeta:"T4"
      lloc:"Gran Hermano"

      Per tant, per cada item (string) del array 'ubicacionsPersona' hem de trobar l'objecte del array 'ubicacions' segons la propietat lloc i afegir-lo al array 'selected'
    */
    marcarUbicacionsPersona: function(){

      // ubicacionsPersona: array de strings (ve del component cFormPersonal)
      // ubicacions: array d'objectes de les ubicacions (state.objModulUbicacions.llistaUbicacions)
      for(let i=0; i<this.ubicacionsPersona.length; i++){
        for(let j=0; j<this.ubicacions.length; j++){
          
          if(this.ubicacionsPersona[i] == this.ubicacions[j].lloc){
            this.selected.push(this.ubicacions[j])
            console.log('objecte marcat: ' + JSON.stringify(this.ubicacions[j]));
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
