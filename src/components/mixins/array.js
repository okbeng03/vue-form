import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
import draggable from 'vuedraggable'

export default {
  data () {
    return {
      len: 0
    }
  },
  props: {
    definition: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    },
    schema: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      model: state => state.model
    }),
    list: {
      get () {
        return _.get(this.model, this.path)
      },
      set (value) {
        this.setValue({ path: this.path, value: value})
      }
    },
    minItems () {
      return this.schema.minItems || 0
    },
    maxItems () {
      return this.schema.maxItems || 100
    }
  },
  created () {
    var model = _.get(this.model, this.path)

    this.len = model ? model.length : 0
  },
  methods: {
    ...mapMutations([
      'removeValue',
      'setValue',
      'exchanceItem'
    ]),
    remveItem (idx) {
      if (this.len > this.minItems) {
        this.len = this.len - 1

        this.removeValue(this.path.concat(idx))
      } else {
        /* global alert:true */
        /* eslint no-undef: "error" */
        alert('小于最小个数')
      }
    },
    addItem () {
      if (this.len < this.maxItems) {
        this.len = this.len + 1
      } else {
        /* global alert:true */
        /* eslint no-undef: "error" */
        alert('大于最大个数')
      }
    },
    upItem (idx) {
      this.exchanceItem({ path: this.path, newIndex: idx - 1, oldIndex: idx})
    },
    downItem (idx) {
      this.exchanceItem({ path: this.path, newIndex: idx, oldIndex: idx + 1})
    }
  },
  components: {
    draggable
  }
}
