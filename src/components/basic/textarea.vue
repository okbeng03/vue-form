<template>
  <textarea type="text" class="form-control vue-form-input" v-model.lazy="value"
    :placeholder="definition.placeholder"
    :disabled="definition.disabled"
    :maxlength="schema.maxlength"
    :minLength="schema.minLength"
    :name="name"
    :readonly="definition.readonly"
    :required="definition.required"
    :rows="definition.row || 3"
  >
  </textarea>
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  mixins: [basicMixin]
}
</script>
