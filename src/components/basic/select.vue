<template>
  <select class="form-control vue-form-input" v-model.lazy="value"
    :name="name"
    :disabled="definition.disabled"
    :mutiple="definition.mutiple"
  >
    <!-- <option value="-1">请选择</option> -->
    <option v-for="option in definition.options" :value="option.value" :key="option.value">{{ option.text }}</option>
  </select>
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  mixins: [basicMixin]
}
</script>
