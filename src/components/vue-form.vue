<template>
  <div class="vue-form">
    <component :is="theme"></component>
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Horizontal from './layout/horizontal.vue'

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
}
</script>
