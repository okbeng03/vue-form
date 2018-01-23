'use strict';

import SparkForm from '../dist/form'

var sparkForm = {
  schema: {
    "title": "options",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "名称"
      },
      "source": {
        "type": "string",
        "title": "数据源",
        "default": "-1"
      }
    },
    "required": ["name", "source"]
  },
  form: [
    {
      "type": "html",
      "tpl": '<div class="alert alert-info" role="alert">这不过就是一段表单说明，但是我不知道写什么好！</div>'
    },
    "name",
    {
      "key": "source",
      "type": "select"
    }
  ],
  data: {
    "name": "王昌彬",
    "source": "1"
  }
};

$(function() {
  var form = new SparkForm('#doc', {
    schema: sparkForm.schema,
    form: sparkForm.form,
    data: sparkForm.data,
    ready: function() {
      setTimeout(function() {
        var options = {
          '【投放位】推品': '0',
          '【投放位】商加品': '1',
          'offer加强版': '2'
        };

        $('#doc select[name="source"]').data('setOptions')(options);
      }, 1000);
    }
  });

  $('#save').click(function() {
		var result = form.getValues();

		if (result) {
			console.log(result);
		}
	});
});
