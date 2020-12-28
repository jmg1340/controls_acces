<template>

    <q-table
      title="Personal assignat"
      :data="personalUbicacioTarjeta"
      :columns="columns"
      row-key="lloc"

      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      
      
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

  name: 'cllistaPersonalUbicacions',

  props:['ubicacio'],

  created: function(){

    this.actLlistarPersonalSegonsUbicacio(this.ubicacio)
    .then((llistaPersonalUbicacio) => {
      console.log("action 'actLlistarPersonalUbicacions completada\nllistaPersonalUbicacio: " + JSON.stringify(llistaPersonalUbicacio));
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
      personalUbicacio: state => state.objModulPersonal.llistaPesonalUbicacio
    }),

    personalUbicacioTarjeta: function() {
      let array = [];
      for(let i=0; i<this.personalUbicacio.length; i++) {

        let obj = this.personalUbicacio[i];
        obj.codiTarjeta = this.personalUbicacio[i].numero.toString().padStart(6,'0') + "00"
        array.push(obj)
      }

      return array
    }
  },


  methods:{
    ...mapActions('objModulPersonal',[
        'actLlistarPersonalSegonsUbicacio',
    ]),

  }

};
</script>

<style lang="css" scoped>


 .my-sticky-header-table .q-table__top  {
    color: red;
    background-color: #c1f4cd;
 } 



</style>
