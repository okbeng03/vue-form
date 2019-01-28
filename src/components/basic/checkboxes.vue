<template>
  <div>
    <label class="checkbox-inline" v-for="item in definition.options" :key="item.value">
      <input class="vue-form-input" type="checkbox" v-model="value"
      :value="item.value"
      :disabled="definition.disabled"
      :name="path"
      :readonly="definition.readonly"
      :lazy="definition.lazy === false ? false : true" />
      {{ item.text }}
    </label>
  </div>
</template>

<script>
import basicMixin from '../mixins/basic.js'
import _ from 'lodash'

export default {
  mixins: [basicMixin]
}
</script>
