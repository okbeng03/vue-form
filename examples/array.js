'use strict';

import SparkForm from '../dist/form'

var sparkForm = {
  schema: {
    "title": "array",
    "type": "object",
    "properties": {
      "classes": {
        "type": "array",
        "title": "课程",
        "minItems": 1,
        "items": {
          "type": "object",
          "title": "标题",
          "properties": {
            "name": {
              "type": "string",
              "title": "名称"
            },
            "score": {
              "type": "integer",
              "title": "分数"
            },
            "date": {
              "type": "string",
              "title": "日期"
            }
          },
          "required": ["name", "score", "date"]
        }
      },
      "name": {
        "type": "string",
        "title": "姓名"
      }
    },
    "required": ["classes", "name"]
  },
  form: [
    {
      "type": "html",
      "tpl": "<div class='row' style='text-align:center;'><span class='col-xs-6'>名称</span><span class='col-xs-6'>分数</span></div>"
    },
    {
      "key": "classes",
      "items": [
        {
          "type": "inline",
          "items": [
            {
              "key": "classes[].name",
              "title": "",
              "col": 4
            },
            {
              "key": "classes[].score",
              "title": "",
              "col": 4
            },
            {
              "key": "classes[].date",
              "title": "",
              "col": 4,
              "type": "date"
            }
          ]
        }
      ]
    },
    "name"
  ],
  data: {
    classes: [
      {
        name: '语文',
        score: 80
      },
      {
        name: '数学',
        score: 100
      }
    ],
    name: '王昌彬'
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
