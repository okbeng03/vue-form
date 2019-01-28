<template>
  <input type="number" class="form-control vue-form-input" v-model.lazy="value"
    :placeholder="definition.placeholder"
    :disabled="definition.disabled"
    :max="schema.maximum"
    :min="schema.minimum"
    :name="name"
    :readonly="definition.readonly"
    :required="definition.required"
    :step="definition.step"
  />
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  mixins: [basicMixin]
}
</script>
