<template>
  <select class="form-control col-sm-8" name="main-source" v-model="sourceId">
    <option v-for="item in sources" :value="item.value">{{item.text}}</option>
  </select>
</template>

<script>
  var sourceStore = require('../../data-source/source-store.js')
  var _ = require('lodash')

  module.exports = {
    data: function () {
      return {
        sources: [
          {
            value: -1,
            text: '请选择'
          }
        ]
      }
    },
    props: [
      'sourceId',
      'bizType',
      'isPrimary'
    ],
    computed: {
    },
    created: function () {
      var that = this

      sourceStore.get(this.bizType, this.isPrimary).then(function (options) {
        that.sources = options
      })

      this.$watch('bizType', function () {
        sourceStore.get(that.bizType, that.isPrimary).then(function (options) {
          if (_.indexOf(options, that.sourceId) === -1) {
            that.sourceId = -1
          }

          that.sources = options
        })
      })
    }
  }
</script>
