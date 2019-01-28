<template>
  <vue-form
    :schema="schema"
    :definition="definition"
    :model="model"
  >
    <div class="form-group form-action">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-primary" @click="submit">提交</button>
      </div>
    </div>
  </vue-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
          type: 'tabs',
          title: '注册',
          // 'active': 1,
          items: [
            {
              title: 'tabA',
              items: [
                'name',
                'phone'
              ]
            },
            {
              title: 'tabB',
              items: [
                'phone'
              ]
            }
          ]
        }
      ],
      model: {
        name: {
          firstName: '昌彬',
          lastName: '王'
        },
        phone: '15882241580'
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.model,
      valid: state => state.valid
    }),
  },
  methods: {
    submit () {
      console.log(this.data)
      this.validate()

      if (this.valid) {
        console.log('submit form !')
      }
    },
    ...mapMutations([
      'validate'
    ])
  }
}
</script>
