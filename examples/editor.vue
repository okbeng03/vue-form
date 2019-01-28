<template>
  <vue-form
    :schema="schema"
    :definition="definition"
  >
  </vue-form>
</template>

<script>
export default {
  data () {
    return {
      schema: {
        title: 'editor',
        type: 'object',
        properties: {
          title: {
            type: 'string',
            title: '标题'
          },
          content: {
            type: 'string',
            title: '内容'
          }
        },
        required: ['title', 'content']
      },
      definition: [
        'title',
        {
          key: ['content'],
          type: 'editor',
          config: {
            init: {
              height: 300
            },
            plugins: 'emoticons directionality anchor autosave',
            toolbar: 'ltr rtl | emoticons'
          }
        }
      ]
    }
  }
}
</script>
