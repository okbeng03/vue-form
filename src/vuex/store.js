import * as mutations from './mutations'
import * as getters from './getters'
import Generator from '../core/schema'

const state = {
  schema: {},
  definition: [],
  model: {},
  theme: 'bootstrap',
  valid: true,
  messages: {},  // 校验信息
  ajv: null,
  validator: null,
  // exclude: [],  // 需要排除的校验字段
  isRootArray: false,
  generator: new Generator()
}

export default {
  state,
  mutations: {
    ...mutations
  },
  getters: {
    ...getters
  }
}
