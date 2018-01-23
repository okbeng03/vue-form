<template>
  <div>
    <div class="form-group">
      <label class="col-sm-2 control-label">聚合类型：</label>
      <div class="col-sm-10">
        <label class="radio-inline">
          <input type="radio" name="source-link-standard-type" v-model="bizType" value="1">品聚合
        </label>
        <label class="radio-inline">
          <input type="radio" name="source-link-standard-type" v-model="bizType" value="0">商聚合
        </label>
        <label class="radio-inline">
          <input type="radio" name="source-link-standard-type" v-model="bizType" value="2">商+品聚合
        </label>
      </div>
    </div>
    <source v-for="source in mainSources" :source="source" :biz-type="bizType" :is-primary=true :idx="$index"></source>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-primary" @click="addMainSourceItem">新增主数据源</button>
      </div>
    </div>
    <source v-for="source in subSources" :source="source" :biz-type="bizType" :is-primary=false :idx="$index"></source>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-primary" @click="addSubSourceItem">新增从数据源</button>
      </div>
    </div>
  </div>
</template>

<script>
  var Source = require('./source.vue')

  module.exports = {
    props: [
      'bizType',
      'mainSources',
      'subSources'
    ],
    components: {
      Source
    },
    methods: {
      addMainSourceItem: function () {
        this.mainSources.push({
          id: -1,
          properties: []
        })
      },
      addSubSourceItem: function () {
        this.subSources.push({
          id: -1,
          properties: []
        })
      }
    },
    events: {
      removeMainSourceItem: function (idx) {
        this.mainSources.splice(idx, 1)
      },
      removeSubSourceItem: function (idx) {
        this.subSources.splice(idx, 1)
      }
    }
  }
</script>
