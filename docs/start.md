## 基本使用
首先，在页面中引入style和js
```html
<link rel="stylesheet" href="bootstrap.css" />
...
<script src="jquery.js"></script>
<script src="vue-form.js"></script>
```

然后，在页面引入vue form自定义标签
```html
<spark-form :schema="schema" :form="form" :model="model">
  <!--表单提交-->
  <div class="form-group form-action">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="button" class="btn btn-primary" id="save">提交</button>
    </div>
  </div>
</spark-form>
```

最后定义您的JSON schema，form definition(可选)，可以设置初始数据，初始化Vue实例
```javascript
// json schema
var schema = {
  "title": "basic",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "姓名"
    },
    "phone": {
      "type": "string",
      "title": "手机",
      "pattern": /^1[3578]\d{9}/,
      "description": "请输入正确的手机号码"
    }
  },
  "required": ["name", "phone"]
};

// form definition
var formDefinition = [
  "name",
  {
    "key": "phone",
    "placeholder": "13/15/17/18开头的手机号码"
  }
];

// 初始化数据
var data = {
  name: '王昌彬'
};

var form = new VueForm('body', {
  schema: schema,
  form: formDefinition,
  data: data
});

$('#save').click(function() {
  var result = form.getValues();

  if (result) {
    console.log(result);
  }
});
```

您得到的是类似这样的一个表单
![vue form basic use](https://cbu01.alicdn.com/cms/upload/2016/305/655/2556503_1625054590.png)
