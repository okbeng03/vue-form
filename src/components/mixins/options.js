import _ from 'lodash'
import $ from 'jquery'
import formSchema from '../../core/schema.js'

export default {
  ready: function () {
    var that = this

    $(this.$el).data('setOptions', function (options) {
      if (!_.isObject(options)) {
        throw new Error('options是简单对象{key: value}')
      }

      options = formSchema.formatOptions(options)
      that.$set('definition.options', options)
    })
  }
}
