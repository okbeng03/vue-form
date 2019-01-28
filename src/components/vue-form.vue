<template>
  <div class="vue-form">
    <component :is="theme"></component>
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Horizontal from './layout/horizontal.vue'
// import { init } from './src/vuex/actions'
// import Store from '../store'

// import './src/core/index.less'

export default {
  props: {
    schema: {
      type: Object,
      required: true
    },
    definition: {
      type: Array
    },
    model: [Object, Array],
    theme: {
      type: String,
      default: 'bootstrap'
    }
  },
  created: function () {
    const { schema, definition, model } = this

    this.init({ schema, definition, model })
  },
  components: {
    'bootstrap': Horizontal
  },
  methods: {
    ...mapMutations([
      'init'
    ])
  }
  // events: {
  //   // 提交，提交前要先触发该事件，再获取值
  //   'submit.vue-form': function () {
  //     this.validate()
  //   },
  //   // 校验指定属性，可以指定校验成功与否
  //   // 用于干预校验结果
  //   'validate.vue-form': function (path, isValid, error) {
  //     this.validateCustom(path, isValid, error)
  //   }
  // }
}
</script>
