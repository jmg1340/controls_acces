<template>
  <q-page class=" rows q-pa-lg col items-start q-gutter-md">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->


      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Com arrancar la app"
        caption="by JMG"
        :header-style="{ backgroundColor: '#cccc66' }"
      >
        <jmg_cArranc></jmg_cArranc>
      </q-expansion-item>


      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="... sobre la BDD (MongoDB)"
        caption="by JMG"
        :header-style="{ backgroundColor: '#cccc66' }"
      >
        <jmg_cBDD></jmg_cBDD>
      </q-expansion-item>



      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="... funcionament de la app"
        caption="by JMG"
        :header-style="{ backgroundColor: '#cccc66' }"
      >
        <jmg_cApp></jmg_cApp>
      </q-expansion-item>



 


  </q-page>
</template>

<style>
  pre{
      background-color: lightgray;
  }

  .my-card{
      background-color: lightyellow;
  }
</style>



<script>

import jmg_cArranc from "components/pIndex/cArranc";
import jmg_cBDD from "components/pIndex/cBDD";
import jmg_cApp from "components/pIndex/cApp";

export default {
  name: 'PageIndex',
  components: {
    jmg_cArranc,
    jmg_cBDD,
    jmg_cApp
  },


}
</script>
