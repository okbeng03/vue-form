import * as mutations from './mutations'
import * as getters from './getters'

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
  isRootArray: false
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
