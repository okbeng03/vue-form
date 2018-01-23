<template>
  <component :is="theme" v-el:div></component>
  <slot></slot>
</template>

<script>
import Horizontal from './src/components/layout/horizontal.vue'
import { setDefinition, validate, validateCustom } from './src/vuex/actions'

import './src/core/index.less'

export default {
  vuex: {
    getters: {
      theme: state => state.theme,
      model: state => state.model,
      schema: state => state.schema
    },
    actions: {
      validate,
      validateCustom,
      setDefinition
    }
  },
  components: {
    'horizontal': Horizontal
  },
  created: function () {
    this.setDefinition()
  },
  events: {
    // 提交，提交前要先触发该事件，再获取值
    'submit.vue-form': function () {
      this.validate()
    },
    // 校验指定属性，可以指定校验成功与否
    // 用于干预校验结果
    'validate.vue-form': function (path, isValid, error) {
      this.validateCustom(path, isValid, error)
    }
  }
}
</script>
