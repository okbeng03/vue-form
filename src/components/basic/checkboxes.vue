<template>
  <div>
    <label class="checkbox-inline" v-for="item in definition.options">
      <input class="spark-input" type="checkbox" v-model="value"
      :value="item.value"
      :disabled="definition.disabled"
      :name="path"
      :readonly="definition.readonly"
      :lazy="definition.lazy === false ? false : true" />
      {{item.text}}
    </label>
  </div>
</template>

<script>
import basicMixin from '../mixins/basic.js'
import _ from 'lodash'

export default {
  data () {
    return {
      originValue: []
    }
  },
  ready () {
    this.$watch('value', function (val) {
      if (_.isEqual(val, this.originValue)) {
        return
      }

      this.validateSingle(this.path, val, this.schema)
      this.originValue = _.clone(val)
    })
  },
  mixins: [basicMixin]
}
</script>
