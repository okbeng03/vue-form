## 校验
Vue Form的校验是基于[tv4 -- Tiny Validator (for v4 JSON Schema)](https://github.com/geraintluff/tv4)。
校验结果会显示在对应的表单元素下面。

[校验对应的提示](https://github.com/geraintluff/tv4/blob/master/lang/zh-CN.js)

### 触发时机
* 表单元素值改变（默认lazy，change时才触发）
* 表单提交时

### 自定义校验
为了更灵活的使用自定义校验，Vue Form提供了`form.validate(name, isValid, message)`方法去展示校验结果
* name: 可以通过input[name]获取
* isValid: 校验结果
* message: 校验文案

例：
```js
// 一个性别下拉框，当选择女生的时候提示“你确定是个女生？”
...
ready: function() {
  $('#doc select[name="sex"]').on('change', function() {
    var elem = $(this);
    var val = elem.val();

    if (val === "1") {
      form.validate('sex', false, '你确定自己是个女生?');
    }
  });
}
...
```

### 修改校验提示（暂未实现）
