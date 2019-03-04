import _ from 'lodash'
import extend from 'extend'
import Generator from '../core/schema'
import { parseErrors } from '../util/util'
import Ajv from '../validate'
import localize from '../validate/localize'

const generator = new Generator()
const ARRAY_ROOT_KEY = 'silentList'

export const init = (state, { schema, definition, model = {} }) => {
  // 根节点是array，要嵌套一层
  if (schema.type === 'array') {
    let newSchema = {
      'title': '列表',
      'type': 'object',
      'properties': {},
      'required': [ARRAY_ROOT_KEY]
    }

    newSchema.properties[ARRAY_ROOT_KEY] = Object.assign({}, schema)
    schema = newSchema

    if (!_.isEmpty(model)) {
      let newModel = {}

      newModel[ARRAY_ROOT_KEY] = model
      model = extend(true, {}, newModel)
    }

    if (!_.isEmpty(definition)) {
      let newForm = [{
        'title': '',
        'type': 'array',
        'key': ARRAY_ROOT_KEY,
        'items': []
      }]

      newForm[0]['items'] = addRootArray(definition)
      definition = newForm
    }

    state.isRootArray = true
  }

  state.definition = generator.parse(schema, definition)
  state.schema = schema
  
  const data = generator.getDefaultModal(schema)
  state.model = extend(true, {}, data, model)
  state.ajv = new Ajv()
}

/**
 * 设置表单元素校验结果
 * @param {Array} path   属性路径
 * @param {Number} status 0：初始状态，1：正确，2：错误
 * @param {String} msg    校验结果message
 */
export const setMessages = (state, messages) => {
  const map = {}

  Object.keys(messages).forEach(path => {
    const msg = messages[path]
    map[path] = msg.message ? {
      status: 2,
      message: messages[path].message
    } : {
      status: 1
    }
  })

  state.messages = Object.assign({}, state.messages, map)
}

// 校验整个表单
export const validate = (state, path) => {
  // 延迟compile，保证自定义format、keyword添加
  if (!state.validator) {
    state.validator = state.ajv.compile(state.schema)
  }

  const valid = state.validator(state.model)
  let errors
  path = path ? path.join('.') : null

  if (!valid) {
    localize(state.validator.errors, state.schema)
    let allErrors = parseErrors(state.validator.errors)

    if (path) {
      if (allErrors[path]) {
        errors = {}
        errors[path] = allErrors[path]
      }
    } else {
      errors = allErrors
    }

    if (errors) {
      setMessages(state, errors)
    }
  }

  if (!errors && path) {
    errors = {}
    errors[path] = true
    setMessages(state, errors)
  }

  state.model = Object.assign({}, state.model)
  state.valid = valid
}

/**
 * 设置指定属性值，表单元素值修改时触发
 * @param {Array} path  属性路径
 * @param {ALL} value 值
 */
export const setValue = (state, { path, value }) => {
  if (!path || typeof value === 'undefined') {
    throw new Error('path and value is required!')
  }

  const last = path[path.length - 1]

  // 数组修改
  if (typeof last === 'number') {
    path.pop()

    const model = _.get(state.model, path)
    last >= model.length ? model.push(value) : model.splice(last, 1, value)
  } else {
    const model = Object.assign({}, state.model)

    _.set(model, path, value)
    state.model = Object.assign({}, model)
  }

  validate(state, path)
}

export const setModel = (state, model) => {
  state.model = _.cloneDeep(model)

  validate(state)
}

// 删除指定属性，表单元素值为空或数组删除时触发
export const removeValue = (state, path) => {
  const last = path[path.length - 1]

  if (typeof last === 'number') {
    path.pop()

    const model = _.get(state.model, path)
    model.splice(last, 1)
  } else {
    const model = Object.assign({}, state.model)

    _.unset(model, path)
    state.model = Object.assign({}, model)
  }

  validate(state, path)
}

export const exchanceItem = (state, { path, newIndex, oldIndex }) => {
  if (newIndex > oldIndex) {
    const temp = newIndex
    newIndex = oldIndex
    oldIndex = temp
  }

  const model = _.get(state.model, path)
  const oldItem = model.splice(oldIndex, 1)
  model.splice(newIndex, 0, oldItem[0])
}

export const setOptions = (state, { key, options }) => {
  const definition = _.cloneDeep(state.definition)
  const def = getDefinitionByPath(definition, key)
  def.options = options

  state.definition = definition
}

function getDefinitionByPath (definition, path) {
  let def
  path = path.replace(/(\[\s?\])/g, '$index')

  for (let i = 0, len = definition.length; i < len; i++) {
    def = definition[i]

    if (!def.key) {
      continue
    }

    if (def.key.join('.') === path) {
      return def
    }
    
    if (def.items) {
      return getDefinitionByPath(def.items, path)
    }
  }
}

function addRootArray (form) {
  _.forEach(form, function (item, idx) {
    item.key = ARRAY_ROOT_KEY + item.key

    if (item.items) {
      addRootArray(item.items)
    }
  })
}
