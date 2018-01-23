'use strict';

import SparkForm from '../dist/form'

var sparkForm = {
  schema: {
    "title": "okbeng",
    "type": "array",
    "items": {
      "type": "object",
      "title": "列表",
      "properties": {
        "name": {
          "type": "string",
          "title": "课程"
        },
        "score": {
          "type": "integer",
          "title": "分数"
        }
      },
      "required": ["name", "score"]
    }
  },
  form: [{
    "type": "inline",
    "items": [{
      "title": "标题",
      "key": "name",
      "type": "text",
      "col": 5
    }, {
      "title": "标题",
      "key": "age",
      "type": "number",
      "col": 6
    }]
  }],
  data: [
    {
      name: '语文',
      score: 80
    },
    {
      name: '数学',
      score: 100
    }
  ]
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
