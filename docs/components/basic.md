## 基础表单组件
### Mixin
* `mixins/basic.js`
提供了基础表单组件基本功能。所以基础组件一般只需
```js
module.exports = {
  mixins: [basicMixin]
};
```
* `mixins/options.js`
提供了select、checkboxs等多选表单元素的options异步设置功能。在表单元素上，我们暴露了`data-set-options`方法，所以
```js
ready: function() {
  setTimeout(function() {
    var options = {
      '【投放位】推品': '0',
      '【投放位】商加品': '1',
      'offer加强版': '2'
    };

    $('select[name="source"]').data('setOptions')(options);
  }, 1000);
}
```

### 组件列表和它的Form Definition
#### checkbox
基本form definition

默认值: false

#### checkboxs
基本form definition
```json
{
  "options": {
    "key": "value"
  }
}
```
默认值: []

#### date
基本form definition

#### hidden[不稳定]

#### html
自定义html文本
```json
{
  "tpl": html
}
```

#### number
基本form definition

#### select
基本form definition
```json
{
  "mutiple": false,
  "options": {
    "key": "value"
  }
}
```

#### text
基本form definition

#### textarea
基本form definition
```json
{
  "row": 3
}
```
