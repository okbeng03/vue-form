<template>
  <div class="checkbox">
    <label>
      <input class="spark-input" type="checkbox" v-model="value"
      :disabled="definition.disabled"
      :name="name"
      :readonly="definition.readonly"
      :required="definition.required"
      :lazy="definition.lazy === false ? false : true" />
      {{definition.schema.title}}
    </label>
  </div>
</template>

<script>
import basicMixin from '../mixins/basic.js'

export default {
  data: function () {
    return {
      originValue: false
    }
  },
  mixins: [basicMixin]
}
</script>
