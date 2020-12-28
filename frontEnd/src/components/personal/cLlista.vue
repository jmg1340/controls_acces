<template>
  <div class="row"> 
    <q-table
      title="Personal"
      :data="llista"
      :columns="columns"
      row-key="_id"
      :pagination.sync="pagination"
      width="75%"
      :filter="filter"
      dense
      table-style="{background-color: 'yellow'}"
    >
      <template v-slot:top-right>

        <!-- recuadre text a buscar -->
        <q-input dense debounce="300" dense v-model="filter" placeholder="text a buscar" class="q-mr-lg">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
       
        <q-space />

        <!-- boto nova persona -->
        <q-btn 
          color="positive" 
          round 
          icon="person_add"
          align="center" 
          class="q-mr-md"
          @click="obrirFormulariNouUsuari" />
        
      </template>
 

      <q-tr slot="body" slot-scope="props" :props="props">

        <!-- columna numero d'usuari -->
        <q-td key="numero" :props="props">
          {{ props.row.numero }}
        </q-td>

        <!-- columna nom d'usuari -->
        <q-td key="nom" :props="props">
          {{ props.row.nom }}
        </q-td>

        <!-- columna amb botons edicio i eliminar -->
        <q-td key="id" :props="props" >
          <q-btn size="sm" round dense color="warning" icon="create" @click="obrirFormulariEdicioUsuari(props.row)" class="q-mr-md" />
          <q-btn size="sm" round dense color="negative" icon="delete" @click="eliminar(props.row)"  />
        </q-td>
      
      </q-tr>

    </q-table>
  </div>
</template> 

<script>
import { mapState, mapActions} from 'vuex';
import cmp_formPersonal from "components/personal/cFormPersonal";

export default {
  // name: 'ComponentName',
  
  created: function(){
    console.log("Estic a CREATE del component cLlista")
    this.actLlistarPersonal()  // omple l'array state.objModulPersonal.llistaPersonal amb les dades de MongoDB
  },


  data () {
    return {
      numero: "",
      nom: "",
      cognom: "",

      filter: '',

      pagination: {
           page: 1,    
           rowsPerPage: 10 // 0 means all rows    
      } ,     
      columns:[
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
    ...mapActions('objModulPersonal',[
        'actLlistarPersonal',
        'actEliminarPersonal'
    ]),


    /**
      Metode: eliminar
      Funcionalitat: Elimina l'usuari de MongoDB (i de la llista)
    */
    eliminar: function (objPersonaEliminar) {

      this.$q.dialog({
        title: 'Confirmar',
        message: 'Eliminar ' + objPersonaEliminar.nom.toUpperCase() + ' ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        
        this.actEliminarPersonal(objPersonaEliminar)
        .then( (registreEliminat) => {
          this.$q.notify('Registre eliminat: \n' + JSON.stringify(registreEliminat));
          console.log("Registre eliminat: " + registreEliminat);

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

    /**
      Metode: obrirFormulariEdicioUsuari
      Funcionalitat: dispara l'accio de mostrar el formulari desde la pagina pPersonal amb les dades de l'usuari 
    */
    obrirFormulariEdicioUsuari: function (objPersonaEditar) {
      this.$emit('eventMostrar', {queMostrar: 'formulari', objPers: objPersonaEditar});
    },

    /**
      Metode: obrirFormulariEdicioUsuari
      Funcionalitat: dispara l'accio de mostrar el formulari desde la pagina pPersonal per introduir dades de nou usuari 
    */
    obrirFormulariNouUsuari: function() {
     this.$emit('eventMostrar', {queMostrar: 'formulari', objPers: null});
    },


  },

  computed: {
    ...mapState({
      llista: state => state.objModulPersonal.llistaPersonal
    })
  },

}
</script>

<style>
</style>
