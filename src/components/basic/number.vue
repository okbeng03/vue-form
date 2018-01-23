<template>
  <input type="number" class="form-control spark-input" v-model="value"
  :placeholder="definition.placeholder"
  :disabled="definition.disabled"
  :max="definition.schema.maximum"
  :min="definition.schema.minimum"
  :name="name"
  :readonly="definition.readonly"
  :required="definition.required"
  :step="definition.step"
  :lazy="definition.lazy === false ? false : true" />
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  mixins: [basicMixin]
}
</script>
