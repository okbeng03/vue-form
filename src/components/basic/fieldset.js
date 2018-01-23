import Vue from 'vue'
import objectMixin from '../mixins/object.js'

Vue.component('fieldset', {
  template: `<div class="fieldset">
              <form-group v-for="group in definition.items" :definition="group"></form-group>
            </div>`,
  mixins: [objectMixin]
})
