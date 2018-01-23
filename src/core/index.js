import $ from 'jquery'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import store from '../vuex/store'
import VueForm from '../../vue-form.vue'
import {
  validate,
  validateCustom,
  setValue,
  removeValue
} from '../vuex/actions'

export default class SparkForm {
  constructor (el, options) {
    var that = this

    this.config = $.extend(true, {}, options)
    var config = {
      state: {
        schema: this.config.schema || {},
        form: this.config.form || [],
        model: this.config.data || {}
      }
    }
    this.store = $.extend(true, {}, store, config)

    var vm = new Vue({
      el: el,
      store: new Vuex.Store(this.store),
      vuex: {
        getters: {
          model: state => state.model,
          valid: state => state.valid,
          isRootArray: state => state.isRootArray
        },
        actions: {
          validate,
          validateCustom,
          setValue,
          removeValue
        }
      },
      components: {
        'spark-form': VueForm
      },
      ready: function () {
        if (that.config.ready) {
          that.config.ready.call(this)
        }
      },
      events: {
        'submit': function () {
          this.valid()
        }
      }
    })

    this.vm = vm
  }

  validate (path, isValid, error) {
    this.vm.validateCustom(path, isValid, error)
  }

  getValues () {
    this.vm.validate()

    var result
    var store = this.store

    if (store.state.valid) {
      result = $.extend(true, {}, store.state.model)

      if (this.vm.$get('isRootArray')) {
        result = result['silentList']
      }
    } else {
      result = false
    }

    return result
  }

  setValue (path, value) {
    if (!path) {
      console.log('缺少参数path')

      return
    }

    if (typeof path === 'string') {
      path = _.toPath(path)
    }

    value ? this.vm.setValue(path, value) : this.vm.removeValue(path)
  }
}
