<template>
  <div>
    <input type="hidden" class="form-control spark-input" v-model="value"
    :maxlength="definition.schema.maxlength"
    :minLength="definition.schema.minLength"
    :name="name"
    :pattern="definition.schema.pattern"
    :required="definition.required" />
    <slot></slot>
  </div>
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  mixins: [basicMixin]
}
</script>
