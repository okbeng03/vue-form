import _ from 'lodash'
import { setValue, removeValue, setMessage, validateSingle } from '../../vuex/actions'

export default {
  vuex: {
    getters: {
      model: state => state.model
    },
    actions: {
      setValue,
      removeValue,
      setMessage,
      validateSingle
    }
  },
  data () {
    return {
      originValue: null
    }
  },
  computed: {
    value: {
      get () {
        return _.get(this.model, this.path)
      },
      set (val) {
        if (typeof val === 'string') {
          val = val.trim()
        }

        // 无值
        if (val === '') {
          if (this.required) {
            this.setMessage(this.path, 2, '此项为必填项')
          }

          this.$nextTick(function () {
            this.removeValue(this.path)
          })
        } else {
          if (this.type === 'number') {
            val = val - 0
          }

          this.validateSingle(this.path, val, this.schema)
        }

        this.setValue(this.path, val)
      }
    },
    name () {
      return this.$get('path').join('.')
    },
    type () {
      return this.$get('definition.type')
    },
    required () {
      return this.$get('definition.required')
    },
    schema () {
      return this.$get('definition.schema')
    }
  },
  props: {
    definition: {
      type: Object
    },
    path: {
      type: Array
    }
  },
  created () {
    var value = _.get(this.model, this.path)

    if (typeof value !== 'undefined') {
      this.originValue = _.clone(value)
    } else if (this.originValue !== null) {
      // 设置表单元素默认值
      this.setValue(this.path, this.originValue)
    }
  }
}
