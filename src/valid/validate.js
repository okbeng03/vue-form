import tv4 from 'tv4'
import _ from 'lodash'
import $ from 'jquery'

import './lang'
tv4.language('vue-form')

export default class Validator {
  constructor () {
    this.customErrors = {}
  }

  validate (data, schema) {
    var result = tv4.validateResult(data, schema)

    return result
  }

  validateMultiple (data, schema) {
    var result = tv4.validateMultiple(data, schema)

    return this.merge(result)
  }

  validateCustom (path, isValid, msg) {
    var valid = {
      valid: true,
      error: {
        path: path.split('.'),
        message: ''
      }
    }

    if (isValid) {
      delete this.customErrors[path]
    } else {
      valid.valid = false
      valid.error.message = msg

      this.customErrors[path] = valid.error
    }

    return valid
  }

  merge (result) {
    var errors = parseError(result)

    // 合并错误，schema error优先
    errors = $.extend(true, {}, this.customErrors, errors)

    return errors
  }
}

// 将错误数组转成对象{path: error}
function parseError (result) {
  var errors = {}

  if (result.errors.length) {
    _.each(result.errors, function (error, idx) {
      var path = error.dataPath ? error.dataPath.substr(1).split('/') : []
      var key = error.params.key

      if (key) {
        path = path.concat([key])
      }

      error.path = path
      errors[path.join('.')] = error
    })
  }

  return errors
}
