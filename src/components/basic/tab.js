import Vue from 'vue'
import _ from 'lodash'
import objectMixin from '../mixins/object.js'
import { excludeErrors } from '../../vuex/actions'

Vue.component('tab', {
  template: `<div>
              <ul class="nav nav-tabs">
                <li v-for="(idx, item) in definition.items" :class="{'active': ($index === active)}">
                  <a href="#" @click.prevent="tab(idx)">{{item.title}}</a>
                </li>
              </ul>
              <div class="tab-content">
                <div v-for="(idx, item) in definition.items" class="tab-pane" :class="{'active': (idx === active)}">
                  <form-group v-for="group in item.items" :definition="group"></form-group>
                </div>
              </div>
            </div>`,
  vuex: {
    actions: {
      excludeErrors
    }
  },
  data () {
    return {
      active: 0,
      tabs: [],
      items: []
    }
  },
  ready () {
    var active = this.$get('definition.active')

    if (typeof active !== 'undefined') {
      this.$set('active', active)
    }

    var tabs = this.$get('definition.items')

    this.tabs = tabs.map(function (tab, idx) {
      return tab.items.map(function (item, idx) {
        return item.key
      })
    })

    this.items = _.unionWith(...this.tabs, _.isEqual)
  },
  methods: {
    tab (idx) {
      var active = this.$get('active')

      if (idx !== active) {
        this.$set('active', idx)
      }

      this.excludeErrors(_.differenceWith(this.items, this.tabs[idx], _.isEqual))
    }
  },
  mixins: [objectMixin]
})
