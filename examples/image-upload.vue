<template>
  <vue-form
    :schema="schema"
    :model="model"
    :definition="definition"
  >
  </vue-form>
</template>

<script>
import axios from 'axios'

function upload (image) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: 'http://ava.com/api/imagemin',
      data: {
        data: image
      }
    }).then(response => {
      console.log(response)
      resolve('http://aaa.jpg')
    }).catch(err => {
      console.error(err)
      reject(err)
    })
  })
}

export default {
  data () {
    return {
      schema: {
        title: 'basic',
        type: 'object',
        properties: {
          avatar: {
            type: 'string',
            title: '头像',
            format: 'image'
          }
        },
        required: ['avatar']
      },
      definition: [
        {
          key: 'avatar',
          type: 'image-upload',
          config: {
            action: upload
          }
        }
      ],
      model: {
        // avatar: 'http://www.vue-form.com/huiyuan.jpg'
      }
    }
  }
}
</script>
