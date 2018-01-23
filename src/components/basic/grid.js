import Vue from 'vue'

Vue.component('spark-grid', {
  template: `<div class="row">
              <div v-for="item in definition.items" class="col-xs-{{item.col}}">
                <form-group :definition="item"></form-group>
              </div>
            </div>`,
  props: {
    definition: {
      type: Object
    }
  }
})
