import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import VueForm from '../dist/vue-jsonschema-form.umd.js'
import { store } from '../dist/vue-jsonschema-form.umd.js'
import App from './basic.vue'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueForm)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  components: { App },
  template: '<App ref="app"/>'
})
