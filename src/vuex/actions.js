// import * as types from './mutation-type'

export const setDefaultModel = ({ dispatch }) => dispatch('SET_DEFAULT_MODEL')
export const setDefinition = ({ dispatch }) => dispatch('SET_DEFINITION')
export const setValue = ({ dispatch }, path, value) => dispatch('SET_VALUE', path, value)
export const removeValue = ({ dispatch }, path) => dispatch('REMOVE_VALUE', path)
export const setMessage = ({ dispatch }, path, status, msg) => dispatch('SET_MESSAGE', path, status, msg)
export const validate = ({ dispatch }) => dispatch('VALIDATE')
export const validateSingle = ({ dispatch }, path, value, schema) => dispatch('VALIDATE_SINGLE', path, value, schema)
export const validateCustom = ({ dispatch }, path, isValid, msg) => dispatch('VALIDATE_CUSTOM', path, isValid, msg)
export const excludeErrors = ({ dispatch }, items) => dispatch('EXCLUDE_ERRORS', items)
export const exchanceItem = ({ dispatch }, path, newIndex, oldIndex) => dispatch('EXCHANGE_ITEM', path, newIndex, oldIndex)
export const setUploadurl = ({ dispatch }) => dispatch('SET_UPLOADURL')
export const emptyModel = ({ dispatch }) => dispatch('EMPTY_MODEL')
