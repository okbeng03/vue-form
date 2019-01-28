<template>
  <vue-form
    :schema="schema"
    :model="model"
  >
  </vue-form>
</template>

<script>
export default {
  data () {
    return {
      schema: {
        title: 'basic',
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: '姓名'
          },
          phone: {
            type: 'string',
            title: '手机',
            pattern: '^1[3578]\\d{9}$',
            description: '请输入正确的手机号码'
          }
        },
        required: ['name', 'phone']
      },
      model: {
        name: '王昌彬'
      }
    }
  }
}
</script>
