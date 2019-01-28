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
        title: 'array',
        type: 'object',
        properties: {
          classes: {
            type: 'array',
            title: '课程',
            minItems: 1,
            items: {
              type: 'object',
              title: '',
              properties: {
                name: {
                  type: 'string',
                  title: '名称'
                },
                score: {
                  type: 'number',
                  title: '分数'
                }
              },
              required: ['name', 'score']
            }
          },
          name: {
            type: 'string',
            title: '姓名'
          }
        },
        required: ['classes', 'name']
      },
      definition: [
        {
          type: 'html',
          tpl: '<div class="row" style="text-align:center;"><span class="col-xs-6">名称</span><span class="col-xs-6">分数</span></div>'
        },
        'classes',
        'name'
      ],
      model: {
        classes: [
          {
            name: '语文',
            score: 80
          },
          {
            name: '数学',
            score: 100
          }
        ],
        name: '王昌彬'
      }
    }
  }
}
</script>
