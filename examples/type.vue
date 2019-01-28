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
            type: 'string',
            title: '姓名'
          },
          age: {
            type: 'number',
            title: '年龄',
            minimum: 1,
            maximum: 120,
            default: 25
          },
          single: {
            type: 'boolean',
            title: '是否单身'
          },
          sex: {
            type: 'string',
            title: '性别',
            enum: ['0', '1'],
            default: '0'
          },
          hobby: {
            title: '爱好',
            type: 'array',
            items: {
              type: 'string',
              title: '爱好',
              enum: ['乒乓球', '足球', '篮球']
            }
          },
          other: {
            'title': '其他',
            'type': 'string',
            'maxlength': 100
          },
          birthday: {
            title: '出生日期',
            type: 'string',
            format: 'date-time'
          },
          group: {
            title: '分组',
            type: 'array',
            items: {
              type: 'string',
              title: '爱好'
            }
          }
        },
        'required': ['name', 'age', 'single', 'sex', 'hobby', 'other', 'birthday']
      },
      definition: [
        {
          type: 'html',
          tpl: '<div class="alert alert-info" role="alert">这不过就是一段表单说明，但是我不知道写什么好！</div>'
        },
        {
          key: 'name',
          lazy: false
        },
        'age',
        'single',
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
        },
        'hobby',
        {
          key: 'other',
          type: 'textarea'
        },
        {
          key: 'birthday',
          type: 'date',
          beforeDay: '2019-01-25',
          config: {
            type: 'datetime',
            format: 'YYYY-MM-DD HH:mm:ss'
          }
        },
        // {
        //   key: 'birthday',
        //   min: '2016-1-15'
        // }
        // {
        //   key: 'group',
        //   type: 'suggestion',
        //   options: {
        //     '1688': 0,
        //     'tmall': 1,
        //     'taobao': 2,
        //     'alipay': 3
        //   },
        //   'multiple': true
        // }
      ],
      model: {
        name: '王昌彬',
        hobby: ['足球']
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
