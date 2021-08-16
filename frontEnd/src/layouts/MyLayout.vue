<template>
  <q-layout view="hHh Lpr lFf" class="">
    <q-header>
      <q-toolbar
        class="fons"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Controls d'accés
          <div slot="subtitle">Llistes blanques</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        bordered separator
      >
        <q-item to="/">
          <q-item-label>Inici</q-item-label>
        </q-item>
        <q-item to="/personal">
          <q-item-label>Personal</q-item-label>
        </q-item>
        <q-item to="/trax">
          <q-item-label>TRAX</q-item-label>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style scoped>

.fons{
	/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#627d4d+0,1f3b08+100;Olive+3D */
	background: #627d4d; /* Old browsers */
	background: -moz-linear-gradient(top,  #627d4d 0%, #1f3b08 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top,  #627d4d 0%,#1f3b08 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom,  #627d4d 0%,#1f3b08 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#627d4d', endColorstr='#1f3b08',GradientType=0 ); /* IE6-9 */
}

</style>
