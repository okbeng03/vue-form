import $ from 'jquery'
import _ from 'lodash'
import formSchema from '../core/schema'
import Validator from '../valid/validate.js'

const validator = new Validator()
const ARRAY_ROOT_KEY = 'silentList'

const state = {
  schema: {},
  form: [],
  definition: [],
  model: {},
  theme: 'horizontal',
  valid: true,
  message: {},  // 校验信息
  exclude: [],  // 需要排除的校验字段
  uploadUrl: '',
  isRootArray: false
}

const mutations = {
  // 设置初始值
  SET_DEFAULT_MODEL (state) {
    // 去除多余数据，保证结构变化后，数据是正确的
    if (!_.isEmpty(state.model)) {
      var newModel = _.cloneDeep(state.model)

      uniqModel(newModel, state.schema, ['properties'])
      state.model = Object.assign({}, newModel)
    }

    var defaultValue = formSchema.defaultValue(state.schema)
    var data = state.model
    var model

    if (defaultValue && data) {
      model = $.extend(true, {}, defaultValue, data)
    } else if (defaultValue) {
      model = defaultValue
    } else {
      model = data
    }

    state.model = model
  },

  EMPTY_MODEL (state) {
    var defaultValue = formSchema.defaultValue(state.schema)

    state.model = Object.assign({}, defaultValue)
  },

  // 合并表单描述
  SET_DEFINITION (state) {
    // 根节点是array，要嵌套一层
    if (state.schema.type === 'array') {
      let newSchema = {
        'title': 'JSON Schema',
        'type': 'object',
        'properties': {},
        'required': [ARRAY_ROOT_KEY]
      }

      newSchema.properties[ARRAY_ROOT_KEY] = Object.assign({}, state.schema)
      state.schema = Object.assign(newSchema)

      if (!_.isEmpty(state.model)) {
        let newModel = {}

        newModel[ARRAY_ROOT_KEY] = state.model
        state.model = Object.assign({}, newModel)
      }

      if (!_.isEmpty(state.form)) {
        let newForm = [{
          'title': '',
          'type': 'array',
          'key': ARRAY_ROOT_KEY,
          'items': []
        }]

        newForm[0]['items'] = addRootArray(state.form)
        state.form = newForm
      }

      state.isRootArray = true
    }

    var definition = formSchema.merge(state.schema, state.form)

    state.definition = definition

    mutations.SET_DEFAULT_MODEL(state)
  },

  /**
   * 设置指定属性值，表单元素值修改时触发
   * @param {Array} path  属性路径
   * @param {ALL} value 值
   */
  SET_VALUE (state, path, value) {
    path = path.slice()

    var last = path[path.length - 1]

    // 数组修改
    if (typeof last === 'number') {
      path.pop()

      let model = _.get(state.model, path)
      last >= model.length ? model.push(value) : model.splice(last, 1, value)
    } else {
      let model = Object.assign({}, state.model)

      _.set(model, path, value)
      state.model = Object.assign({}, model)
    }
  },

  // 删除指定属性，表单元素值为空或数组删除时触发
  REMOVE_VALUE (state, path) {
    var last = path[path.length - 1]

    if (typeof last === 'number') {
      path.pop()

      let model = _.get(state.model, path)
      model.splice(last, 1)
    } else {
      let model = Object.assign({}, state.model)

      _.unset(model, path)
      state.model = Object.assign({}, model)
    }
  },

  /**
   * 交换数组顺序
   * @param {Array} path     属性路径
   * @param {Integer} newIndex 新位置
   * @param {Integer} oldIndex 旧位置
   */
  EXCHANGE_ITEM (state, path, newIndex, oldIndex) {
    if (newIndex > oldIndex) {
      let temp = newIndex
      newIndex = oldIndex
      oldIndex = temp
    }

    var model = _.get(state.model, path)
    var oldItem = model.splice(oldIndex, 1)
    model.splice(newIndex, 0, oldItem[0])
  },

  /**
   * 设置表单元素校验结果
   * @param {Array} path   属性路径
   * @param {Number} status 0：初始状态，1：正确，2：错误
   * @param {String} msg    校验结果message
   */
  SET_MESSAGE (state, path, status, msg) {
    const item = {
      status: status || 0,
      msg: msg || ''
    }

    let message = Object.assign({}, state.message)

    _.set(message, path, item)
    state.message = Object.assign({}, state.message, message)
  },

  // 校验整个表单
  VALIDATE (state) {
    var errors = validator.validateMultiple(state.model, state.schema)

    if (_.isEmpty(errors)) {
      state.valid = true
    } else {
      errors = excludeErrors(errors, state.exclude)

      if (_.isEmpty(errors)) {
        state.valid = true

        return
      }

      _.each(errors, function (error) {
        mutations.SET_MESSAGE(state, error.path, 2, error.message)
      })

      state.valid = false
    }
  },

  /**
   * 校验指定表单元素
   * @param {Array} path   属性路径
   * @param {ALL} value  值
   * @param {Object} schema 对应schema规则
   */
  VALIDATE_SINGLE (state, path, value, schema) {
    var valid = validator.validate(value, schema)

    if (!valid.valid) {
      mutations.SET_MESSAGE(state, path, 2, valid.error.message)
    } else {
      mutations.SET_MESSAGE(state, path, 1)
    }
  },

  /**
   * 设置自定义校验
   * @param {Array}  path    属性路径
   * @param {Boolean} isValid 校验是否通过
   * @param {String}  msg     校验message
   */
  VALIDATE_CUSTOM (state, path, isValid, msg) {
    var valid = validator.validateCustom(path, isValid, msg)

    if (!valid.valid) {
      mutations.SET_MESSAGE(state, valid.error.path, 2, valid.error.message)
    } else {
      mutations.SET_MESSAGE(state, valid.error.path, 1)
    }
  },

  /**
   * 排除指定校验结果，目前只用于tab切换
   * @param {Array} items 排除的元素
   */
  EXCLUDE_ERRORS (state, items) {
    state.exclude = items.map(function (item) {
      return item.join('.')
    })
  },

  SET_UPLOADURL (state) {
    if (state.uploadUrl) {
      return
    }

    var url = 'http://cms.cn.alibaba-inc.com/page/upload/flash_upload_screen.html;JSESSIONID='

    $.ajax({
      url: 'http://cms.cn.alibaba-inc.com/page/box/json.html',
      dataType: 'jsonp',
      data: {
        'action': 'PageManager',
        'event_submit_do_getSession': true
      },
      success: function (res) {
        if (res) {
          url = url + res
          state.uploadUrl = url
        }
      }
    })
  }
}

function excludeErrors (errors, excludes) {
  return _.pickBy(errors, function (error) {
    var path = error.path.join('.')

    return _.findIndex(excludes, function (item) {
      return path.indexOf(item) === 0
    })
  })
}

function addRootArray (form) {
  _.forEach(form, function (item, idx) {
    item.key = ARRAY_ROOT_KEY + item.key

    if (item.items) {
      addRootArray(item.items)
    }
  })
}

function uniqModel (model, schema, path) {
  var newModel = _.cloneDeep(model)

  _.forEach(newModel, function (value, key) {
    let newPath = path.slice()

    newPath.push(key)

    if (!_.get(schema, newPath)) {
      if (_.isArray(newModel)) {
        model.splice(key, 1)
      } else if (_.isObject(newModel)) {
        delete model[key]
      }
    } else {
      if (_.isArray(value)) {
        newPath.push('items')
        newPath.push('properties')

        _.forEach(model[key], function (item, idx) {
          uniqModel(item, schema, newPath)
        })
      } else if (_.isObject(value)) {
        newPath.push('properties')

        uniqModel(model[key], schema, newPath)
      }
    }
  })
}

export default {
  state,
  mutations
}
