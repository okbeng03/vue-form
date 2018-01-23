import Vue from 'vue'
import $ from 'jquery'
import _ from 'lodash'
import formSchema from '../../core/schema'
import { setValue, removeValue, exchanceItem } from '../../vuex/actions'

import sortable from 'vue-drag-and-drop'

Vue.use(sortable)

export default {
  vuex: {
    getters: {
      model: state => state.model
    },
    actions: {
      removeValue,
      setValue,
      exchanceItem
    }
  },
  data () {
    return {
      len: 0,
      defaultValue: null
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
  computed: {
    minItems () {
      return this.$get('definition.schema.minItems') || 0
    },
    maxItems () {
      return this.$get('definition.schema.maxItems') || 100
    }
  },
  created () {
    var model = _.get(this.model, this.path)

    this.len = model ? model.length : 0

    this.defaultValue = formSchema.defaultValue(this.$get('definition.schema'))[0]
  },
  methods: {
    remveItem (idx) {
      if (this.$get('len') > this.minItems) {
        this.len = this.len - 1

        this.removeValue(this.path.concat(idx))
      } else {
        /*global alert:true*/
        /*eslint no-undef: "error"*/
        alert('小于最小个数')
      }
    },
    addItem () {
      // TODO: 判断是否超出最大个数
      if (this.$get('len') < this.maxItems) {
        if (this.defaultValue) {
          this.setValue(this.path.concat(this.len), _.clone(this.defaultValue))
        }

        this.len = this.len + 1
      } else {
        alert('大于最大个数')
      }
    },
    upItem (idx) {
      this.exchanceItem(this.path, idx - 1, idx)
    },
    downItem (idx) {
      this.exchanceItem(this.path, idx, idx + 1)
    },
    moveItem (itemOne, itemTwo) {
      this.exchanceItem(this.path, $(itemOne).data('index'),
        $(itemTwo).closest('.list-group-item').data('index'))
    }
  }
}
