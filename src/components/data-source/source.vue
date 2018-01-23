<template>
  <div class="form-group main-source">
    <label class="col-sm-2 control-label" v-if="isPrimary">选择主数据源：</label>
    <label class="col-sm-2 control-label" v-if="!isPrimary">选择从数据源：</label>
    <div class="col-sm-10">
      <div class="fd-clr">
        <spark-select :source-id.sync="source.id" :biz-type="bizType" :is-primary="isPrimary"></spark-select>
        <div class="col-sm-2">
          <button class="btn btn-danger item-delete" type="button" @click="removeItem()">删除</button>
        </div>
      </div>
      <property :properties="source.properties" :source-id.sync="source.id"></property>
    </div>
  </div>
</template>

<script>
  var SparkSelect = require('./select.vue')
  var Property = require('./property.vue')

  module.exports = {
    data: function () {
      return {

      }
    },
    props: [
      'source',
      'bizType',
      'isPrimary',
      'idx'
    ],
    components: {
      SparkSelect,
      Property
    },
    methods: {
      removeItem: function () {
        if (this.isPrimary) {
          this.$dispatch('removeMainSourceItem', this.idx)
        } else {
          this.$dispatch('removeSubSourceItem', this.idx)
        }
      }
    },
    ready: function () {
      var that = this

      this.$watch('source.id', function (newValue) {
          that.source.properties = []
      })
    }
  }
</script>
