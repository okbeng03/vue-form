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
  var formA = new SparkForm('#instance-a', {
    schema: sparkForm.schema,
    data: {
      name: '王昌彬A'
    }
  });

  $('#save-a').click(function() {
    var result = formA.getValues();

    if (result) {
      console.log(result);
    }
  });

  var formB = new SparkForm('#instance-b', {
    schema: sparkForm.schema,
    data: {
      name: '王昌彬B'
    }
  });

  $('#save-b').click(function() {
    var result = formB.getValues();

    if (result) {
      console.log(result);
    }
  });
});
