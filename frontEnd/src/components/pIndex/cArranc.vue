<template>
    
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Per a que funcioni l'app:</div>
      </q-card-section>

      <q-card-section>
        Comprovar que el servei de MongoDB (mongod) esta corrent. Si no s'haurà d'arrancar:
        <pre>
        sudo service mongod status
        sudo service mongod start
        </pre>
      </q-card-section>

      <q-card-section>
        Arrancar el programa servidor que esta a /PROJECTES/EXPRESS/CONTROLSACCESS
        <pre>npm run dev</pre>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        Per ultim arrancar aquesta App. /PROJECTES/QUASAR/CONTROLS_ACCES
        <pre>npx quasar dev</pre>
     </q-card-section>
    </q-card>

</template> 

<script>


export default {
  // name: 'ComponentName',

  data () {
    return {
    }
  }
  
}
</script>

<style>
</style>