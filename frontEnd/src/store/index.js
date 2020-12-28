import Vue from 'vue'
import Vuex from 'vuex'

import objModulPersonal from './modul-personal'
import objModulUbicacions from './modul-ubicacionsTrax'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      namespaced: true,
      objModulPersonal,
      objModulUbicacions
    }
  })

  return Store
}
