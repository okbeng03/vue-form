<template>
  <vue-form
    :schema="schema"
    :definition="definition"
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
            type: 'object',
            title: '姓名',
            properties: {
              firstName: {
                type: 'string',
                title: ''
              },
              lastName: {
                type: 'string',
                title: ''
              }
            },
            required: ['firstName', 'lastName'],
            errorMessage: {
              required: '请输入姓名'
            }
          },
          phone: {
            type: 'string',
            title: '手机号码',
            description: '请输入正确的手机号码',
            pattern: '^1[3578]\\d{9}$'
          }
        },
        required: ['name', 'phone']
      },
      definition: [
        '*'
      ],
      model: {
        name: {
          firstName: '昌彬',
          lastName: '王'
        },
        phone: '15882241580'
      }
    }
  }
}
</script>
