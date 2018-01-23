<template>
  <input type="text" class="form-control spark-input" v-model="value"
  :placeholder="definition.placeholder"
  :disabled="definition.disabled"
  :maxlength="definition.schema.maxlength"
  :minLength="definition.schema.minLength"
  :name="name"
  :pattern="definition.schema.pattern"
  :readonly="definition.readonly"
  :required="definition.required"
  :lazy="definition.lazy === false ? false : true" />
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  mixins: [basicMixin]
}
</script>
