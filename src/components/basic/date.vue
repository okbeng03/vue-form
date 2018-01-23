<template>
  <div class="input-group date" v-datepicker="value">
      <input type="text" class="form-control spark-input" :value="date" :name="name" :lazy="definition.lazy === false ? false : true" />
      <span class="input-group-addon">
          <span class="glyphicon glyphicon-calendar"></span>
      </span>
  </div>
</template>

<script>
import $ from 'jquery'
import '../../../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
import '../../../bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
import moment from '../../../bower_components/moment/moment'
import basicMixin from '../mixins/basic.js'

export default {
  data () {
    return {
      date: ''
    }
  },
  computed: {
    format () {
      var date = this.$get('definition.date')

      if (date && date.format) {
        return date.format
      }

      var dateFormat = this.$get('definition.schema').format || ''
      var format

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
    timestamp () {
      var date = this.$get('definition.date')

      if (date && date.timestamp) {
        return date.timestamp
      }

      return false
    }
  },
  created () {
    if (this.value) {
      this.date = moment(this.value).format(this.format)
    }
  },
  mixins: [basicMixin],
  directives: {
    'datepicker': {
      twoWay: true,
      priority: 1000,
      bind: function () {
        var that = this
        var definition = this.vm.$get('definition')
        var options = {
          format: this.vm.$get('format'),
          locale: 'zh-cn',
          allowInputToggle: true,
          widgetPositioning: {
            horizontal: 'left'
          }
        }

        if (definition.min) {
          options.minDate = new Date(definition.min)
        }

        if (definition.max) {
          options.maxDate = new Date(definition.max)
        }

        $(this.el).datetimepicker(options)
          .on('dp.change', function () {
            var val = $(this).find('input').val()

            val = that.vm.timestamp ? new Date(val).getTime() : val
            that.vm.$set('value', val)
          })
      },
      unbind: function () {
        $(this.el).off().datetimepicker('destroy')
      }
    }
  }
}
</script>
