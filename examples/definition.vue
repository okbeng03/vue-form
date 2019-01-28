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
            type: 'string',
            title: '姓名'
          },
          phone: {
            type: 'string',
            title: '手机',
            pattern: '^1[3578]\d{9}$',
            description: '请输入正确的手机号码'
          }
        },
        required: ['name', 'phone']
      },
      definition: [
        'name',
        {
          key: 'phone',
          placeholder: '13/15/17/18开头的手机号码'
        }
      ],
      model: {
        name: '王昌彬'
      }
    }
  }
}
</script>
