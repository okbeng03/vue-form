<template>
  <textarea type="text" class="form-control spark-input" v-model="value"
  :placeholder="definition.placeholder"
  :disabled="definition.disabled"
  :maxlength="definition.schema.maxlength"
  :minLength="definition.schema.minLength"
  :name="name"
  :readonly="definition.readonly"
  :required="definition.required"
  :rows="definition.row || 3"
  :lazy="definition.lazy === false ? false : true"></textarea>
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  computed: {
    len: function () {
      return this.$get('value').length
    },
    row: function () {
      return this.$get('definition.row') || 3
    }
  },
  mixins: [basicMixin]
}
</script>
