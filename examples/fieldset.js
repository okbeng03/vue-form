'use strict';

import SparkForm from '../dist/form'

var sparkForm = {
  schema: {
    "title": "basic",
    "type": "object",
    "properties": {
      "name": {
        "type": "object",
        "title": "姓名",
        "properties": {
          "firstName": {
            "type": "string",
            "title": ""
          },
          "lastName": {
            "type": "string",
            "title": ""
          }
        },
        "required": ["firstName", "lastName"]
      },
      "phone": {
        "type": "string",
        "title": "手机号码",
        "description": "请输入正确的手机号码",
        "pattern": /^1[3578]\d{9}$/
      }
    },
    "required": ["name", "phone"]
  },
  form: [
    "*"
  ],
  data: {
    name: {
      firstName: '昌彬',
      lastName: '王'
    },
    phone: '15882241580'
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
