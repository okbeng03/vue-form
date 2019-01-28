<template>
  <datepicker
    v-model="value"
    :type="options.type"
    :range="options.range"
    :value-type="options.valueType"
    :lang="options.lang"
    :clearable="options.clearable"
    :confirm="options.confirm"
    :editable="options.editable"
    :disabled="options.disabled"
    :format="format"
    :width="options.width"
    :not-before="options.notBefore"
    :not-after="options.notAfter"
    :disabledDays="options.disabledDays"
    :append-to-body="options.appendToBody"
    :input-class="'form-control vue-form-input'"
    :placeholder="definition.placeholder"
  >
  </datepicker>
</template>

<script>
import Datepicker from 'vue2-datepicker'
import extend from 'extend'
import basicMixin from '../mixins/basic.js'

const defaults = {
  type: 'date',
  range: false,
  format: 'YYYY-MM-DD',
  valueType: 'format',
  lang: 'zh',
  clearable: false,
  confirm: false,
  editable: true,
  disabled: false,
  appendToBody: false,
  width: 210,
  notBefore: '',
  notAfter: '',
  disabledDays: null,
}

export default {
  computed: {
    format () {
      var date = this.definition.options

      if (date && date.format) {
        return date.format
      }

      const dateFormat = this.schema.format || ''
      let format

      switch (dateFormat) {
        case 'date':
          format = 'YYYY-MM-DD'
          break
        case 'time':
          format = 'HH:mm:ss'
          break
        case 'date-time':
        default:
          format = 'YYYY-MM-DD HH:mm:ss'
          break
      }

      return format
    },
    options () {
      return extend(true, {}, defaults, this.definition.options)
    }
  },
  components: {
    Datepicker
  },
  mixins: [basicMixin]
}
</script>
