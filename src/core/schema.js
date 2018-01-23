import _ from 'lodash'
import objectpath from 'objectpath'

var enumToOptions = function (enm) {
  var options = []

  _.each(enm, function (item, idx) {
    options.push({
      text: item,
      value: item
    })
  })

  return options
}

var formatOptions = function (keyValue) {
  if (_.isArray(keyValue)) {
    return keyValue
  } else {
    var options = []

    _.each(keyValue, function (val, key) {
      options.push({
        text: key,
        value: val
      })
    })

    return options
  }
}

var defaultFormDefinition = function (name, schema, options, form) {
  var rules = defaults[schema.type]
  var def

  // schema解析
  if (rules) {
    for (var i = 0, len = rules.length; i < len; i++) {
      def = rules[i](name, schema, options)

      if (def) {
        break
      }
    }
  }

  return def
}

var standardFormDefinition = function (name, schema, options) {
  var def = {}

  def.title = typeof schema.title !== 'undefined' ? schema.title : name

  if (schema.description) {
    def.description = schema.description
  }

  if (options.required) {
    def.required = true
  }

  def.schema = schema

  options.lookup[objectpath.stringify(options.path)] = def

  return def
}

var text = function (name, schema, options) {
  var type = schema.type

  if (type === 'string') {
    var def = standardFormDefinition(name, schema, options)

    def.key = options.path
    def.type = 'text'

    return def
  }
}

var number = function (name, schema, options) {
  var type = schema.type

  if (type === 'number' || type === 'integer') {
    var def = standardFormDefinition(name, schema, options)

    def.key = options.path
    def.type = 'number'

    return def
  }
}

var fieldset = function (name, schema, options) {
  var type = schema.type

  if (type === 'object') {
    var def = standardFormDefinition(name, schema, options)

    def.key = options.path
    def.type = 'fieldset'
    def.items = []

    parse(schema, def.items, options)

    return def
  }
}

var array = function (name, schema, options) {
  var type = schema.type

  if (type === 'array') {
    var def = standardFormDefinition(name, schema, options)

    def.type = 'array'
    def.key = options.path
    def.items = []

    parse(schema, def.items, options)

    return def
  }
}

var checkbox = function (name, schema, options) {
  var type = schema.type

  if (type === 'boolean') {
    var def = standardFormDefinition(name, schema, options)

    def.type = 'checkbox'
    def.key = options.path

    return def
  }
}

var select = function (name, schema, options) {
  var type = schema.type

  if (type === 'string' && schema['enum']) {
    var def = standardFormDefinition(name, schema, options)

    def.type = 'spark-select'
    def.key = options.path
    def.options = enumToOptions(schema['enum'])

    return def
  }
}

var checkboxes = function (name, schema, options) {
  var type = schema.type

  if (type === 'array' && schema.items && schema.items['enum']) {
    var def = standardFormDefinition(name, schema, options)

    def.type = 'checkboxes'
    def.key = options.path
    def.options = enumToOptions(schema.items['enum'])

    if (def.required && !def.schema.minItems) {
      def.schema.minItems = 1
    }

    return def
  }
}

const DATE_TYPE_ENUM = 'date,date-time,time'
var date = function (name, schema, options) {
  var type = schema.type
  var format = schema.format

  if (type === 'string' && (format && DATE_TYPE_ENUM.indexOf(format) > -1)) {
    var def = standardFormDefinition(name, schema, options)

    def.key = options.path
    def.type = 'date'

    return def
  }
}

var defaults = {
  'string': [date, select, text],
  'number': [number],
  'integer': [number],
  'boolean': [checkbox],
  'object': [fieldset],
  'array': [checkboxes, array]
}

// 遍历schema
var parse = function (schema, form, options, parentType) {
  var type = schema.type

  if (!options.path) {
    options.path = []
  }

  if (type === 'object') {
    // 如果父级是array，中间嵌入inline一层
    // TODO: 以后嵌入table一层
    let defs = {}
    let formItem = {}

    if (parentType === 'array') {
      let size = _.size(schema.properties)
      let itemType = size > 4 ? 'fieldset' : 'inline'

      if (itemType === 'inline') {
        let remain = 11 % size
        let col = (11 - remain) / size
        let cols = []

        // 优化，让列更均等
        if (remain > Math.floor(size / 2)) {
          col = col + 1
          remain = 11 - col * size
        }

        for (let i = 0; i < size; i++) {
          cols[i] = (i === size - 1) ? (col + remain) : col
        }

        let idx = 0

        _.each(schema.properties, function (val, key) {
          defs[key] = {
            'col': cols[idx]
          }

          ++idx
        })
      }

      formItem = {
        'type': itemType,
        'items': []
      }
      form.push(formItem)
      formItem = formItem['items']
    }

    _.each(schema.properties, function (val, key) {
      if (/\./.test(key)) {
        key = [key]
      }

      var path = options.path.slice()
      path.push(key)

      var required = schema.required && _.indexOf(schema.required, key) !== -1

      var def = defaultFormDefinition(key, val, {
        path: path,
        required: required,
        lookup: options.lookup
      })

      if (parentType === 'array') {
        def = Object.assign({}, def, defs[key])
        formItem.push(def)
      } else {
        form.push(def)
      }
    })
  } else if (type === 'array') {
    var path = options.path.slice()

    // 用$index来代替[]，$index作为数组坐标，可替换真实坐标
    path.push('$index')

    parse(schema.items, form, {
      path: path,
      lookup: options.lookup
    }, 'array')
  } else {
    var def = defaultFormDefinition('', schema, {
      path: options.path.slice(),
      lookup: options.lookup
    })

    form.push(def)
  }

  return form
}

var BUILD_IN_TYPE = [
  'select',
  'textarea',
  'html',
  'grid'
]

// 合并form definition & schemaForm
var combine = function (form, schemaForm, lookup) {
  var idx = _.indexOf(form, '*')

  // 用schema生成的默认定义
  if (idx === 0) {
    return schemaForm
  }

  // Important: 存在*就意味着使用schema生成的默认定义，只是在前后做一定的扩展，如果此时存在同名定义，就会存在两个定义。
  if (idx !== -1) {
    form = form.slice(0, idx).concat(schemaForm).concat(form.slice(idx + 1))

    return form
  }

  var definition = []

  _.each(form, function (obj, idx) {
    if (typeof obj === 'string') {
      obj = {
        key: obj
      }
    }

    if (obj.key && typeof obj.key === 'string') {
      obj.key = obj.key.replace(/\[\]/g, '.$index')
      obj.key = objectpath.parse(obj.key)
    }

    if (obj.options) {
      obj.options = formatOptions(obj.options)
    }

    // extend with schema form from schema
    if (obj.key) {
      var path = objectpath.stringify(obj.key)
      var def = lookup[path]

      if (def) {
        _.each(def, function (val, key) {
          if (typeof obj[key] === 'undefined') {
            obj[key] = def[key]
          }
        })
      }
    }

    // 保留html,添加spark-前缀
    if (_.indexOf(BUILD_IN_TYPE, obj.type) > -1) {
      obj.type = 'spark-' + obj.type
    }

    if (obj.items) {
      if (def) {
        obj.items = combine(obj.items, def.items, lookup)
      } else {
        obj.items = combine(obj.items, schemaForm, lookup)
      }
    }

    definition.push(obj)
  })

  return definition
}

export default {
  merge: function (schema, form, options) {
    var definition = form ? _.cloneDeep(form) : []

    options = options || {path: [], lookup: {}}

    var schemaForm = parse(schema, [], options)

    // 再根据form definition合并form schema
    if (definition.length) {
      definition = combine(definition, schemaForm, options.lookup)
    } else {
      definition = schemaForm
    }

    return definition
  },
  appendRule: function (type, rule) {
    if (!defaults[type]) {
      defaults[type] = []
    }

    defaults[type].push(rule)
  },
  prependRule: function (type, rule) {
    if (!defaults[type]) {
      defaults[type] = []
    }

    defaults[type].unshift(rule)
  },
  defaultValue: function (schema) {
    return defaults(schema)

    function defaults (schema) {
      var type = schema.type
      var value

      if (type === 'object') {
        value = {}

        _.each(schema.properties, function (val, key) {
          type = val.type

          if (type === 'object' || type === 'array') {
            value[key] = defaults(val, key)
          }
        })
      } else if (type === 'array') {
        value = []
        type = schema.items.type

        if (type === 'object' || type === 'array') {
          value[0] = defaults(schema.items)
        }
      }

      return value
    }
  },
  formatOptions: formatOptions
}
