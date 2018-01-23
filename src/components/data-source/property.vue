<template>
  <div class="properties">
    <span v-for="item in fields" class="label label-info" :class="{'selected': item.selected}" @click="toggle(item)">{{item.text}}</span>
  </div>
</template>

<script>
  var _ = require('lodash')
  var propertyStore = require('../../data-source/property-store.js')

  module.exports = {
    data: function () {
      return {
        fields: []
      }
    },
    props: [
      'properties',
      'sourceId'
    ],
    created: function () {
      var that = this

      propertyStore.get(this.sourceId, this.properties).then(function (data) {
        that.fields = data
      })

      this.$watch('sourceId', function () {
        propertyStore.get(that.sourceId, that.properties).then(function (data) {
          that.fields = data
        })
      })
    },
    methods: {
      toggle: function (item) {
        var that = this
        var idx = _.indexOf(that.properties, item.value)

        item.selected = !item.selected

        if (item.selected && idx === -1) {
          that.properties.push(item.value)
        }

        if (!item.selected && idx > -1) {
          that.properties.remove(item.value)
        }
      }
    }
  }
</script>
