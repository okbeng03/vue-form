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
            required: ['firstName', 'lastName']
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
        {
          key: 'name',
          type: 'inline',
          items: [
            {
              key: 'name.firstName',
              col: 4
            },
            {
              key: 'name.lastName',
              col: 4
            },
            {
              type: 'html',
              col: 4,
              tpl: '<div class="alert alert-info" role="alert">这不过就是一段表单说明，但是我不知道写什么好！</div>'
            }
          ]
        },
        'phone'
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
