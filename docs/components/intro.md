## 组件
依托于Vue.js的组件化思想，我们想新增一个表单元素，只要新建一个自定义组件即可。

Vue Form提供了三个Mixin，让所有组件可以复用基础功能，编写组件时只要混合对应Mixin，就可以只写template和简单的逻辑实现一个组件了。例如
```html
// text组件
<template>
  <input type="text" class="form-control spark-input" v-model="value"
  :placeholder="definition.placeholder"
  :disabled="definition.disabled"
  :maxlength="definition.schema.maxlength"
  :minLength="definition.schema.minLength"
  :name="name"
  :pattern="definition.schema.pattern"
  :readonly="definition.readonly"
  :required="definition.required"
  lazy />
</template>

<script>
var basicMixin = require('../mixins/basic.js');

module.exports = {
  mixins: [basicMixin]
};
</script>
```

### 属性
#### props
* `definition: Object`
表单定义，最终生成的Form Definition里对应的item。里面还包含对应的`schema`，用于一些表单属性和校验。
* `path: Array`
对应表单数据的路径，用于设置和获取值。

#### data
* `value` 元素值，绑定在表单元素`v-model="value"`上。
* `model` collection数据模型（array、object）。

#### computed
* `name` `path.join('.')` 外面可以通过这个获取表单元素路径；所以**请把这个属性设置在表单元素的`name`属性上**

### 其他
其他配置如**生命周期、事件、方法**等都跟Vue.js一致
