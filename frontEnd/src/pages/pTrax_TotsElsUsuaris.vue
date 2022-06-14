<template>

    <q-table
			id="taula"
      title="Personal assignat"
      :data="personalTraxTarjeta"
      :columns="columns"
      row-key="lloc"

      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      
      
      class="my-sticky-header-table "
      dense
      flat
      dark
      
    >
    </q-table>


</template>

<script>
import { mapState, mapActions} from 'vuex';

export default {

  name: 'cllistaPersonalUbicacions',

  props:['lloc'],

  created: function(){
		console.log("LLOC:", this.lloc)
    this.actLlistarPersonalSegonsTrax("Tots")
    .then((llistaPersonalUbicacio) => {
      console.log("action 'actLlistarPersonalTRAX completada\nllistaPersonalTRAX: " + JSON.stringify(llistaPersonalUbicacio));
      this.personalAssignat = llistaPersonalUbicacio;
    })
    .catch(function(error){
      console.log(error)
    })
    
  },

  data() {
    return {

      //personalAssignat: [],

      pagination: {
         rowsPerPage: 0
      },      
      
      columns:
      [
          {
            name: 'nom',
            required: true,
            label: 'NOM',
            align: 'left',
            field: 'nom',
            sortable: true,
            //classes: 'my-class',
            style: 'width: 50px'
          },
          {
            name: 'numero',
            required: true,
            label: 'NUMERO',
            align: 'center',
            field: 'numero',
            sortable: true,
            //classes: 'my-class',
            style: 'width: 50px'
          },
          {
            name: 'codiTarjeta',
            required: true,
            label: 'CODI TARJETA',
            align: 'center',
            field: 'codiTarjeta',
            sortable: false,
            //classes: 'my-class',
            style: 'width: 50px'
          },
      ]

    };
  },

  computed: {
    ...mapState({
      personalTrax: state => state.objModulPersonal.llistaPersonalTrax
    }),

    personalTraxTarjeta: function() {
      let array = [];
      for(let i=0; i<this.personalTrax.length; i++) {

        let obj = this.personalTrax[i];
        obj.codiTarjeta = this.personalTrax[i].numero.toString().padStart(6,'0') + "00"
        array.push(obj)
      }

      return array
    }
  },


  methods:{
    ...mapActions('objModulPersonal',[
        'actLlistarPersonalSegonsTrax',
    ]),

  }

};
</script>

<style lang="css" scoped>

	#taula {
		margin-top: 10px;
		margin-left: 150px;
		margin-right: 150px;
	}

 .my-sticky-header-table .q-table__top  {
    color: red;
    background-color: #c1f4cd;
 } 



</style>
