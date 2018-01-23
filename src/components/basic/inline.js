import Vue from 'vue'
import objectMixin from '../mixins/object.js'

Vue.component('inline', {
  template: `<div class="row">
              <div v-for="group in definition.items" class="col-xs-{{group.col}}">
                <form-group :definition="group"></form-group>
              </div>
            </div>`,
  mixins: [objectMixin]
})
