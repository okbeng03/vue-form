import $ from 'jquery'
import Vue from 'vue'
import Vuex from 'vuex'

import SparkForm from '../vue-form.vue'
import store from '../src/vuex/store'
import { validate } from '../src/vuex/actions'

var sparkForm = {
  schema: {
    "title": "basic",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "姓名"
      },
      "phone": {
        "type": "string",
        "title": "手机",
        "pattern": /^1[3578]\d{9}/,
        "description": "请输入正确的手机号码"
      }
    },
    "required": ["name", "phone"]
  }
}

// Vue.use(Vuex)

store.state.schema = sparkForm.schema

$(function() {
  var form = new Vue({
    el: '#doc',
    store: new Vuex.Store(store),
    vuex: {
      getters: {
        model: state => state.model,
        valid: state => state.valid
      },
      actions: {
        validate
      }
    },
    components: {
      'spark-form': SparkForm
    },
    ready () {
      var that = this

      $('#save').click(function () {
        that.validate()

        if (that.valid) {
          console.log(that.model)
        }
      })
    }
  });
});
