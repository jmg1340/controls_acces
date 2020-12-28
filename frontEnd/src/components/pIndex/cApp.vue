<template>
    
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Per a llegir les dades STATE (Vuex) en un component </div>
        <pre>
            computed: {
              ...mapState({
                llista: state => state.objModulPersonal.llistaPersonal
              })
            },
        </pre>

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