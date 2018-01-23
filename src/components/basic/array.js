import Vue from 'vue'
import arrayMixins from '../mixins/array.js'

Vue.component('array', {
  template: `<ul class="list-group">
              <li v-for="idx in len" class="list-group-item" data-index="{{idx}}" v-drag-and-drop drop="moveItem">
                <form-group v-for="group in definition.items" :definition="group" :index="idx"></form-group>
                <span type="button" v-if="!definition.isFixed" class="glyphicon glyphicon-remove" @click="remveItem(idx)"></span>
                <span type="button" v-if="!definition.isFixed && idx !== 0" class="glyphicon glyphicon-chevron-up" @click="upItem(idx)"></span>
                <span type="button" v-if="!definition.isFixed && idx !== len - 1" class="glyphicon glyphicon-chevron-down" @click="downItem(idx)"></span>
              </li>
              <li class="list-group-item text-right">
                <button type="button" class="btn btn-primary" @click="addItem">添加</button>
              </li>
            </ul>`,
  mixins: [arrayMixins]
})
