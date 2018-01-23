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
      "sex": {
        "type": "string",
        "title": "性别",
        "enum": ["0", "1"],
        "default": "0"
      }
    },
    "required": ["name", "sex"]
  },
  form: [
    "name",
    {
      "key": "sex",
      "options": {
        "男": "0",
        "女": "1"
      }
    }
  ]
};

$(function() {
  var form = new SparkForm('#doc', {
    schema: sparkForm.schema,
    ready: function() {
      $('#doc select[name="sex"]').on('change', function() {
        var elem = $(this);
        var val = elem.val();

        if (val === "1") {
          form.validate('sex', false, '你确定自己是个女生?');
        } else {
          form.validate('sex', true);
        }
      });
    }
  });

  $('#save').click(function() {
		var result = form.getValues();

		if (result) {
			console.log(result);
		}
	});
});
