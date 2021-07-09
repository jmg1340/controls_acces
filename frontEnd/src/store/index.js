import Vue from 'vue'
import Vuex from 'vuex'

import objModulPersonal from './modul-personal'
import objModulTrax from './modul-trax'

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
      objModulTrax
    }
  })

  return Store
}
