<template>
  <vue-form
    :schema="schema"
    :definition="definition"
    :model="model"
  >
  </vue-form>
</template>

<script>
import { mapState } from 'vuex'

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
          sex: {
            type: 'string',
            title: '性别',
            format: 'sex',
            enum: ['0', '1'],
            default: '0',
            errorMessage: {
              format: '请选择正确的性别！'
            }
          }
        },
        required: ['name', 'sex']
      },
      definition: [
        'name',
        {
          key: 'sex',
          options: [
            {
              label: '男',
              value: '0'
            },
            {
              label: '女',
              value: '1'
            }
          ]
        }
      ],
      model: {
        name: '王昌彬'
      }
    }
  },
  computed: {
    ...mapState({
      ajv: state => state.ajv
    })
  },
  mounted () {
    this.ajv.addFormat('sex', function (value) {
      return value === '0'
    })
  }
}
</script>
