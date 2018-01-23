<template>
  <select class="form-control spark-input" v-model="value"
    :name="name"
    :disabled="definition.disabled"
    :mutiple="definition.mutiple"
  >
    <!-- <option value="-1">请选择</option> -->
    <option v-for="option in definition.options" :value="option.value">{{option.text}}</option>
  </select>
</template>

<script>
import basicMixin from '../mixins/basic.js'
import optionsMixin from '../mixins/options.js'

export default {
  mixins: [basicMixin, optionsMixin]
}
</script>
