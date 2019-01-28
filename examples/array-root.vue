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
        title: '课程',
        type: 'array',
        items: {
          type: 'object',
          title: '',
          properties: {
            name: {
              type: 'string',
              title: '课程'
            },
            score: {
              type: 'number',
              title: '分数'
            }
          },
          required: ['name', 'score']
        }
      },
      model: [
        {
          name: '语文',
          score: 80
        },
        {
          name: '数学',
          score: 100
        }
      ]
    }
  }
}
</script>
