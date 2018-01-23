## 核心概念
![Vue Form架构](https://cbu01.alicdn.com/cms/upload/2016/035/955/2559530_1625054590.png)

Vue Form基于[Vue.js](http://cn.vuejs.org/guide/)双向绑定和组件的强大之处，使用bootstrap实现了一套常见表单所需要的Components，包括：
1. 容器组件
2. 表单组件

* 这些组件都继承自相应的mixins(后面会介绍到) *

如果基本不能满足您的要求，** 可以自定义组件 ** ，并提交给我们

## 模型驱动
Vue Form希望通过实际的表单数据模型自动生成表单，这个表单同时具有表单校验功能。
### [JSON schema](http://gitlab.alibaba-inc.com/river/spec/blob/master/JSON-Schema.md)
JSON schema正好满足要求：
1. 描述了JSON数据类型，表单所需要的required、max、min等
2. 规范描述了JSON数据校验规则

##### JSON schema并非无所不能
* 通过类型规则能够自动生成的表单元素还是有限
* inline、tab等跟布局相关的不能支持
* placeholder、readonly等属性
* JSON schema很多规则都是用来约定数据的，并不适合于表单生成，否则循环生成表单元素时要进行很多过滤。

### Form Definition
为了不偏离JSON schema的初衷，我们需要另外一种描述来定义表单(Form Definition)。它可以：
* 改变表单类型
* 定义表单顺序
* 增删描述
* 布局
* 属性
* ...

### data
可以在初始化时传入初始数据，依赖于Vue.js的双向绑定，任何表单修改都会引起数据的变化，通过`form.getValues()`可以获取数据。

### validator
Vue form的表单校验是通过JSON schema的描述进行校验的，所以这样不管是前端还是后端就可以共用一套校验逻辑了。触发校验的时机：
* 表单元素值改变（默认lazy，change时才触发）
* 表单提交时
