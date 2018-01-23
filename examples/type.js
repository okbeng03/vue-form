'use strict';

import SparkForm from '../dist/form'

var sparkForm = {
  schema: {
    "title": "basic",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "姓名"
      },
      "age": {
        "type": "integer",
        "title": "年龄",
        "minimum": 1,
        "maximum": 120,
        "default": 25
      },
      "single": {
        "type": "boolean",
        "title": "是否单身"
      },
      "sex": {
        "type": "string",
        "title": "性别",
        "enum": ["0", "1"],
        "default": "0"
      },
      "hobby": {
        "title": "爱好",
        "type": "array",
        "items": {
          "type": "string",
          "title": "爱好",
          "enum": ["乒乓球", "足球", "篮球"]
        }
      },
      "other": {
        "title": "其他",
        "type": "string",
        "maxlength": 100
      },
      "birthday": {
        "title": "出生日期",
        "type": "string",
        "format": "date-time"
      },
      "group": {
        "title": "分组",
        "type": "array",
        "items": {
          "type": "string",
          "title": "爱好"
        }
      }
    },
    "required": ["name", "age", "single", "sex", "hobby", "other", "birthday"]
  },
  form: [
    {
      "type": "html",
      "tpl": '<div class="alert alert-info" role="alert">这不过就是一段表单说明，但是我不知道写什么好！</div>'
    },
    {
      "key": "name",
      "lazy": false
    },
    "age",
    "single",
    {
      "key": "sex",
      "options": {
        "男": "0",
        "女": "1"
      }
    },
    "hobby",
    {
      "key": "other",
      "type": "textarea"
    },
    // {
    //   "key": "birthday",
    //   "type": "date",
    //   "min": "2016-1-15",
    //   "date": {
    //     "timestamp": true
    //   }
    // },
    {
      "key": "birthday",
      "min": "2016-1-15"
    },
    {
      "key": "group",
      "type": "suggestion",
      "options": {
        "1688": 0,
        "tmall": 1,
        "taobao": 2,
        "alipay": 3
      },
      "multiple": true
    }
  ],
  data: {
    "name": "王昌彬",
    "hobby": ["足球"]
  }
};

$(function() {
  var form = new SparkForm('#doc', {
    schema: sparkForm.schema,
    form: sparkForm.form,
    data: sparkForm.data
  });

  $('#save').click(function() {
		var result = form.getValues();

		if (result) {
			console.log(result);
		}
	});
});
