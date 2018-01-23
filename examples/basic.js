'use strict';

import SparkForm from '../dist/form'
import _ from 'lodash'

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
        "pattern": "/^1[3578]\\d{9}/",
        "description": "请输入正确的手机号码"
      }
    },
    "required": ["name", "phone"]
  }
};

$(function() {
  var form = new SparkForm('#doc', {
    schema: sparkForm.schema,
    data: {
      name: '王昌彬'
    }
  });

  $('#save').click(function() {
		var result = form.getValues();

		if (result) {
			console.log(result);
		}
	});
});
