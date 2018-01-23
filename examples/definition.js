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
      "phone": {
        "type": "string",
        "title": "手机",
        "pattern": /^1[3578]\d{9}/,
        "description": "请输入正确的手机号码"
      }
    },
    "required": ["name", "phone"]
  },
  form: [
    "name",
    {
      "key": "phone",
      "placeholder": "13/15/17/18开头的手机号码"
    }
  ],
  data: {
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
