<template>
  <div class="checkbox">
    <label>
      <input class="vue-form-input" type="checkbox" v-model.lazy="value"
      :disabled="definition.disabled"
      :name="name"
      :readonly="definition.readonly"
      :required="definition.required"
    />
      {{ schema.title }}
    </label>
  </div>
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  mixins: [basicMixin]
}
</script>
