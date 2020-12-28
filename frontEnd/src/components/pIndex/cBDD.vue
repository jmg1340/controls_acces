<template>
  <div>
     <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Si falla la connexio a la base de dades sortint un missatge dient </div><pre>"MongoError: failed to connect to server [localhost:27017] on first connect at Pool"</pre>
        </q-card-section>


        <q-card-section>
          Exectuar els següents comandaments:
          <pre>
          sudo rm /var/lib/mongodb/mongod.lock
          sudo -u mongodb mongod -f /etc/mongod.conf -repair
          </pre>
       </q-card-section>
      </q-card>



      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Alguns comandaments de MongoDB:</div>
          <pre>
              Show dbs           // mostrar les bdd
              use 'nomBD'        // seleccionar una bdd
              show collections   // mostra les coleccions d'objectes
          </pre>
        </q-card-section>



        <q-card-section>
          Operacions CRUD:
          <pre>
          db.collection.insertOne()
          db.collection.insertMany() 

          db.collection.find()
          <img src="/statics/crud-annotated-mongodb-find.bakedsvg.svg" />

          db.collection.updateOne()
          <img src="/statics/crud-annotated-mongodb-updateMany.bakedsvg.svg" />


          db.collection.deleteOne()
          <img src="/statics/crud-annotated-mongodb-deleteMany.bakedsvg.svg" />

          </pre>
       </q-card-section>
      </q-card>


      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Mongoose CRUD (Create, Read, Update, Delete)</div>
          <a href="https://coursework.vschool.io/mongoose-crud/" target="_blank">Mongoose CRUD</a>
        </q-card-section>

       </q-card-section>
      </q-card>



      <q-btn @click="onOKClick"> Afegir registres personal de cop </q-btn>

  </div>   

</template> 

<script>
import { mapActions } from 'vuex';


export default {
  // name: 'ComponentName',

  data () {
    return {}
  },

  methods:{
    ...mapActions('objModulPersonal',[
        'actOperacioBulk',
    ]),

    onOKClick: function () {

 
        
      console.log("BOTO 'OK' PER A OPERACIO BULK");
/*
      objParametres = {
        coleccio: this.coleccio,
        fitxer: this.fitxer
      }
*/
      this.actOperacioBulk()
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


      
    }




  }  
}
</script>

<style>
</style>