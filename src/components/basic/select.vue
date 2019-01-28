<template>
  <vue-select
    v-model="value"
    :options="definition.options"
    :disabled="definition.disabled"
    :placeholder="definition.placeholder"
    :maxHeight="config.maxHeight"
    :searchable="config.searchable"
    :multiple="config.multiple"
    :taggable="config.taggable"
    :pushTags="config.pushTags"
    :filterable="config.filterable"
    :noDrop="config.noDrop"
  >
    <slot name="no-options">Sorry, no matching options.</slot>
  </vue-select>
  <!-- <select class="form-control vue-form-input" v-model.lazy="value"
    :name="name"
    :disabled="definition.disabled"
    :mutiple="definition.mutiple"
  >
    <option v-for="option in definition.options" :value="option.value" :key="option.value">{{ option.text }}</option>
  </select> -->
</template>

<script>
import _ from 'lodash'
import extend from 'extend'
import vueSelect from 'vue-select'
import basicMixin from '../mixins/basic.js'

const defaults = {
  maxHeight: '400px',
  searchable: true,
  multiple: false,
  taggable: false,
  pushTags: false,
  filterable: true,
  noDrop: false
}

export default {
  computed: {
    value: {
      get () {
        const value = _.get(this.model, this.path)
        const options = this.definition.options

        return _.find(options, { value })
      },
      set (val) {
        // 无值
        if (_.isEmpty(val)) {
          this.removeValue(this.path)
        } else {
          this.setValue({ path: this.path, value: val.value})
        }
      }
    },
    config () {
      return extend(true, {}, defaults, this.definition.config)
    }
  },
  mixins: [basicMixin],
  components: {
    vueSelect
  }
}
</script>
