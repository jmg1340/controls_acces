<template>
  <div class="row"> 
    <q-table
      title="TRAX"
      :data="llista"
      :columns="columns"
      row-key="_id"
      :pagination.sync="pagination"
      dense
    >

      <template slot="top-right" slot-scope="props" class="column">
        <q-btn 
          color="positive" 
          round 
          icon="add"
          align="center" 
          class="q-mr-md"
          @click="obrirFormulariNovaTrax" />
        
      </template>
 
      <q-tr slot="body" slot-scope="props" :props="props">

        
        <q-td key="lloc" :props="props">
          {{ props.row.lloc }}
        </q-td>

        <q-td key="carpeta" :props="props">
          {{ props.row.carpeta }}
        </q-td>


        <q-td key="id" :props="props" >
          <q-btn size="sm" round dense color="warning" icon="create" @click="obrirFormulariEdicioTrax(props.row)" class="q-mr-md" />
          <q-btn size="sm" round dense color="negative" icon="delete" @click="eliminar(props.row)"  />
        </q-td>
      
      </q-tr>

    </q-table>
  </div>
</template> 

<script>
import { mapState, mapActions} from 'vuex';
// import cmp_formTrax from "components/personal/cFormTrax";

export default {
  // name: 'ComponentName',
  
  created: function(){
    console.log("Estic a CREATE del component cLlista")
    this.actLlistarTraxs()
  },

  //props: ['mostrar'],

  data () {
    return {
      lloc: "",
      carpeta: "",

      pagination: {
           page: 1,    
           rowsPerPage: 10 // 0 means all rows    
      } ,     
      columns:[
        {
          name: 'lloc',
          required: true,
          label: 'LLOC',
          align: 'Left',
          field: 'lloc',
          sortable: true,
          //classes: 'my-class',
          style: 'width: 50px'
        },
        {
          name: 'carpeta',
          required: true,
          label: 'CARPETA',
          align: 'Left',
          field: 'carpeta',
          sortable: true,
          //classes: 'my-class',
          style: 'width: 50px'
        },
        {
          name: 'id',
          required: true,
          label: '',
          align: 'left',
          field: '_id',
          sortable: false,
          //classes: 'my-class',
          style: 'width: 40px'
        }
      ]
    }
  },

  methods:{
    ...mapActions('objModulTrax',[
        'actLlistarTraxs',
        'actEliminarTrax'
    ]),

    eliminar: function (objTraxEliminar) {

      this.$q.dialog({
        title: 'Confirmar',
        message: 'Eliminar ' + objTraxEliminar.lloc.toUpperCase() + ' ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        
        this.actEliminarTrax(objTraxEliminar)
        .then( (registreEliminat) => {
          this.$q.notify('Registre eliminat: \n' + JSON.stringify(registreEliminat));
          console.log("Registre modificat: " + registreEliminat);

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


      }).onOk(() => {
        console.log('>>>> second OK catcher')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })


    },


    obrirFormulariEdicioTrax: function (objTraxEditar) {
      this.$emit('eventMostrar', {queMostrar: 'formulari', objTrax: objTraxEditar});
    },


    obrirFormulariNovaTrax: function() {
     this.$emit('eventMostrar', {queMostrar: 'formulari', objTrax: null});
    },


    
    // tancarFormulari: function() {
    //   console.log("estic a TANCAR FORMULARI");
    //   this.actMostrarFormulari(false);
    // }

  },

  computed: {
    ...mapState({
      llista: state => state.objModulTrax.llistaTraxs
    })
  },

}
</script>

<style>
</style>
