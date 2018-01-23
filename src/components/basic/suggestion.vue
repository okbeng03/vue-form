<template>
	<select class="form-control spark-input suggestion" :name="name" v-select="value" :disabled="definition.disabled" :multiple="definition.multiple" v-model="value">
    <option v-for="option in definition.options" :value="option.value">{{option.text}}</option>
  </select>
</template>

<script>
import $ from 'jquery'
import basicMixin from '../mixins/basic.js'
import optionsMixin from '../mixins/options.js'
import 'select2'
import '../../../node_modules/select2/dist/css/select2.css'

export default {
  mixins: [basicMixin, optionsMixin],
  directives: {
    'select': {
      twoWay: true,
      priority: 1000,
      bind: function () {
        var that = this

        setTimeout(function () {
          $(that.el).select2({
            tags: true
          }).on('change', function (e) {
            that.vm.$set('value', $(this).val())
          })
        }, 0)
      },
      unbind: function () {
        $(this.el).off().select2('destroy')
      }
    }
  }
}
</script>
