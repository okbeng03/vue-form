import Vue from 'vue'
import _ from 'lodash'

import sparkText from '../basic/text.vue'
import sparkNumber from '../basic/number.vue'
import sparkCheckbox from '../basic/checkbox.vue'
import sparkSelect from '../basic/select.vue'
import sparkCheckboxs from '../basic/checkboxes.vue'
import sparkTextarea from '../basic/textarea.vue'
import sparkHtml from '../basic/html.vue'
import sparkDatepicker from '../basic/date.vue'
import sparkHidden from '../basic/hidden.vue'
import sparkSuggestion from '../basic/suggestion.vue'

const DEFAULT_VALID = {
  status: 0,
  msg: ''
}

Vue.component('form-group', {
  template: `<div class="form-group" :class="[name, valid.status === 1 ? 'has-success' : valid.status === 2 ? 'has-error' : '']">
                <template v-if="definition.title">
                  <label class="col-sm-2 control-label">
                    <span v-if="definition.required" class="required">*</span>
                    {{definition.title}}:
                  </label>
                  <div class="col-sm-10">
                    <component :is="definition.type" :definition="definition" :path="path">{{{definition.tpl}}}</component>
                  </div>
                  <div class="col-sm-offset-2 col-sm-10 form-tips">
                    <span v-show="valid.status !== 2">{{description}}</span>
                    <span v-show="valid.status === 2">{{valid.msg}}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="col-sm-12">
                    <component :is="definition.type" :definition="definition" :path="path">{{{definition.tpl}}}</component>
                  </div>
                  <div class="col-sm-12 form-tips">
                    <span v-show="valid.status !== 2">{{description}}</span>
                    <span v-show="valid.status === 2">{{valid.msg}}</span>
                  </div>
                </template>
              </div>`,
  vuex: {
    getters: {
      message: state => state.message
    }
  },
  computed: {
    valid () {
      return _.get(this.message, this.path) || DEFAULT_VALID
    },
    description () {
      return this.definition.description
    },
    path () {
      // 根据实际坐标设置路径
      var key = this.$get('definition.key')

      if (key) {
        key = key.slice(0)

        // 先替换父级的path,取父级路径
        var parentPath = this.$parent.$parent.$get('path')

        if (parentPath) {
          var len = parentPath.length
          var keyLen = key.length

          if (len < keyLen) {
            key.splice(0, len)
            key = parentPath.slice(0, len).concat(key)
          }
        }

        var idx = this.$get('index')
        // TODO: 这个传递index的方式有点牵强。
        idx = idx !== -1 ? idx : this.$parent.$parent.$get('index')

        if (idx !== -1) {
          var i = _.lastIndexOf(key, '$index')

          if (i > -1) {
            key.splice(i, 1, idx)
          }
        }

        return key
      } else {
        // 没有key就继承父级的path，保证往上层找肯定能找到path
        return this.$parent.$parent.$get('path') || []
      }
    },
    name () {
      return this.$get('path').join('-')
    }
  },
  props: {
    definition: {
      type: Object
    },
    index: {
      type: Number,
      default: -1
    }
  },
  components: {
    'text': sparkText,
    'number': sparkNumber,
    'checkbox': sparkCheckbox,
    'spark-select': sparkSelect,
    'checkboxes': sparkCheckboxs,
    'spark-textarea': sparkTextarea,
    'spark-html': sparkHtml,
    'date': sparkDatepicker,
    'hidden': sparkHidden,
    'suggestion': sparkSuggestion
  }
})
