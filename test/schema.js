var expect = require('expect.js');
var formSchema = require('../src/core/schema.js');

describe('json schema to definition', function() {
  it('basic', function() {
    var schema = {
      "title": "basic",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "title": "姓名"
        }
      }
    };

    var def = formSchema.merge(schema)[0];

    expect(def.schema).to.be.an('object');
    expect(def.key).to.be.an('array');
    expect(def.title).to.be.an('string');
    expect(def.type).to.be.an('string');
    expect(Object.keys(def)).to.eql(['title', 'schema', 'key', 'type']);
  });

  it('object', function() {
    var schema = {
      "title": "obeject",
      "type": "object",
      "properties": {
        "name": {
          "type": "object",
          "title": "姓名",
          "properties": {
            "firstName": {
              "type": "string",
              "title": "标题"
            },
            "lastName": {
              "type": "string",
              "title": "标题"
            }
          }
        }
      }
    };

    var def = formSchema.merge(schema)[0];

    expect(def.type).to.eql('fieldset');
    expect(def.items).to.be.an('array');
    expect(def.items[0].key).to.eql(['name', 'firstName']);
    expect(def.items.length).to.eql(2);
  });

  it('array', function() {
    var schema = {
      "title": "array",
      "type": "object",
      "properties": {
        "classes": {
          "type": "array",
          "title": "标题",
          "items": {
            "type": "object",
            "title": "标题",
            "properties": {
              "name": {
                "type": "string",
                "title": "标题"
              }
            }
          }
        }
      }
    };

    var def = formSchema.merge(schema)[0];

    expect(def.type).to.eql('array');
    expect(def.items).to.be.an('array');
    expect(def.items[0].key).to.eql(['classes', '$index', 'name']);
  });
});

describe('merge form definition to definition', function() {
  it('change order', function() {
    var schema = {
      "title": "order",
      "type": "object",
      "properties": {
        "age": {
          "type": "integer",
          "title": "年龄"
        },
        "name": {
          "type": "string",
          "title": "姓名"
        }
      }
    };

    var definition = [
      'name',
      'age'
    ];

    var def = formSchema.merge(schema, definition);

    expect(def.length).to.eql(2);
    expect(def[0].key).to.eql(['name']);
    expect(def[1].key).to.eql(['age']);
  });

  it('exclude item', function() {
    var schema = {
      "title": "order",
      "type": "object",
      "properties": {
        "age": {
          "type": "integer",
          "title": "年龄"
        },
        "name": {
          "type": "string",
          "title": "姓名"
        }
      }
    };

    var definition = [
      'age'
    ];

    var def = formSchema.merge(schema, definition);

    expect(def.length).to.eql(1);
    expect(def[0].key).to.eql(['age']);
  });

  it('*', function() {
    var schema = {
      "title": "order",
      "type": "object",
      "properties": {
        "age": {
          "type": "integer",
          "title": "年龄"
        },
        "name": {
          "type": "string",
          "title": "姓名"
        }
      }
    };

    var definition = [
      '*'
    ];

    var def = formSchema.merge(schema, definition);

    expect(def.length).to.eql(2);
  });

  it('extend other item', function() {
    var schema = {
      "title": "order",
      "type": "object",
      "properties": {
        "age": {
          "type": "integer",
          "title": "年龄"
        },
        "name": {
          "type": "string",
          "title": "姓名"
        }
      }
    };

    var definition = [
      {
        'key': 'age',
        'placeholder': '年龄大于0小于120'
      },
      'name',
      {
        'type': 'submit',
        'title': '提交'
      }
    ];

    var def = formSchema.merge(schema, definition);

    expect(def.length).to.eql(3);
    expect(def[0].placeholder).to.eql('年龄大于0小于120');
    expect(def[2]).to.eql({'type': 'submit', 'title': '提交'});
  });

  it('object', function() {
    var schema = {
      "title": "obeject",
      "type": "object",
      "properties": {
        "name": {
          "type": "object",
          "title": "姓名",
          "properties": {
            "firstName": {
              "type": "string",
              "title": "标题"
            },
            "lastName": {
              "type": "string",
              "title": "标题"
            }
          }
        }
      }
    };

    var definition = [
      {
        'key': 'name',
        'items': [
          {
            'key': 'name.firstName',
            'title': '名'
          },
          {
            'key': 'name.lastName',
            'title': '姓'
          }
        ]
      }
    ];

    var def = formSchema.merge(schema, definition);

    expect(def.length).to.eql(1);
    expect(def[0].items.length).to.eql(2);
    expect(def[0].items[0].title).to.eql('名');
    expect(def[0].items[1].title).to.eql('姓');
  });

  it('array', function() {
    var schema = {
      "title": "array",
      "type": "object",
      "properties": {
        "classes": {
          "type": "array",
          "title": "标题",
          "items": {
            "type": "object",
            "title": "标题",
            "properties": {
              "name": {
                "type": "string",
                "title": "标题"
              }
            }
          }
        }
      }
    };

    var definition = [
      {
        'key': 'classes',
        'title': '课程',
        'items': [
          {
            'key': 'classes[].name',
            'title': '名称'
          }
        ]
      }
    ];

    var def = formSchema.merge(schema, definition);

    expect(def[0].title).to.eql('课程');
    expect(def[0].items[0].title).to.eql('名称');
  });

  it('items *', function() {
    var schema = {
      "title": "obeject",
      "type": "object",
      "properties": {
        "name": {
          "type": "object",
          "title": "姓名",
          "properties": {
            "firstName": {
              "type": "string",
              "title": "标题"
            },
            "lastName": {
              "type": "string",
              "title": "标题"
            }
          }
        }
      }
    };

    var definition = [
      {
        'key': 'name',
        'items': [
          '*'
        ]
      }
    ];

    var def = formSchema.merge(schema, definition);

    expect(def.length).to.eql(1);
    expect(def[0].items.length).to.eql(2);
    expect(def[0].items[0].title).to.eql('标题');
    expect(def[0].items[1].title).to.eql('标题');
  });
});
