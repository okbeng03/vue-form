## Form Definition
如果没有提供Form Definition，我们将根据schema渲染默认表单类型。

Form Definition是一个数组，它的子集可以是以下内容：
* `"*"` 完全使用schema生成的默认表单，相当于没设置
* `"name"` schema property name
* `{key: "name"}` 一个Form Field定义对象

Form Definition可以嵌套。

实际上内部会将schema转换成Form Definition，然后如果设置了Form Definition，两者进行合并，Form Definition优先。

### 它可以做什么
* 改变表单类型
支持基础类型外的其他类型
* 定义表单顺序
* 增删表单元素
* 布局
* 属性
* ...

### keywords
Form Definition支持的关键字

```js
{
  "type": "text",             // 表单元素类型
  /* 下面都是可选 */
  "key": "name.firstName",    // data path
  "title": "姓",              // title，默认取schema title；为空可以去掉title
  "description": "",          // 表单元素下面的默认提示文案，默认取schema description
  "placeholder": "",          // placeholder
  "readonly": false,          // 只读
  "disabled": false,          // disabled
  /* 特定类型的属性 */
  "items": [],                // 容器的子表单元素；definition子集
  "mutiple": false,           // 是否多选
  "step": 1,                  // type=number,数字间隔
  "row": 3,                   // type=textarea,row
  "col": 3,                   // type=inline,栅格化col
  "options": {                // select、checkboxs、radios等多选元素的options; key是展示出来的，value代表值
    "key": "value"
  },
  "tpl": ""                   // type=html,模板
}
```

#### type
现在支持的表单元素类型：
##### 基础表单类型
* text
* number
* textarea
* checkbox
* checkboxs
* date
* hidden
* html
* select

##### 容器表单类型
* fieldset
* array
* inline
* tab
* grid

#### key
data属性路径，跟实际对象属性的访问路径相同。

数组元素访问`list[].id`：因为数组的`index`根据实际情况生成，所以这里通过数组下标[]占位表示。如
```js
// data 对应的key
{
  "name": {               // key: "name"
    "firstName": "昌彬",  // key: "name.firstName"
    "lastName": "王"      // key: "name.lastName"
  },
  "age": 25,              // key: "age"
  "classes": [            // key: "classes"
    {
      "name": "语文",      // key: "classes[].name"
      "score": 80          // key: "classes[].score"
    }
  ]
}
```
