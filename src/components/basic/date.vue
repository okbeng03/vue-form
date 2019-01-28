<template>
  <datepicker
    v-model="value"
    :type="config.type"
    :range="config.range"
    :value-type="config.valueType"
    :lang="config.lang"
    :clearable="config.clearable"
    :confirm="config.confirm"
    :editable="config.editable"
    :disabled="config.disabled"
    :format="format"
    :width="config.width"
    :not-before="config.notBefore"
    :not-after="config.notAfter"
    :disabledDays="config.disabledDays"
    :append-to-body="config.appendToBody"
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
      var date = this.definition.config

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
    config () {
      return extend(true, {}, defaults, this.definition.config)
    }
  },
  components: {
    Datepicker
  },
  mixins: [basicMixin]
}
</script>
