<template>
  <div class="image-upload">
    <picture-input
      ref="upload"
      @change="onChange"
      :width="config.width"
      :height="config.height"
      :margin="config.margin"
      :crop="config.crop"
      :radius="config.radius"
      :plain="config.plain"
      :accept="config.accept"
      :size="config.size"
      :removable="config.removable"
      :hideChangeButton="config.hideChangeButton"
      :buttonClass="config.buttonClass"
      :removeButtonClass="config.removeButtonClass"
      :zIndex="config.zIndex"
      :prefill="initializeValue"
      :alertOnError="config.alertOnError"
      :customStrings="config.customStrings">
    </picture-input>
    <span class="value">{{ value }}</span>
  </div>
</template>

<script>
import axios from 'axios'
import PictureInput from 'vue-picture-input'
import extend from 'extend'
import basicMixin from '../mixins/basic.js'

const defaults = {
  width: 200,
  height: 200,
  crop: false,
  margin: 0,
  radius: 0,
  plain: false,
  accept: 'image/*',
  size: 2,
  removable: false,
  hideChangeButton: true,
  buttonClass: 'btn btn-primary',
  removeButtonClass: 'btn btn-secondary',
  zIndex: 1000,
  alertOnError: true,
  customStrings: {
    upload: '<p>Your device does not support file uploading.</p>',
    drag: 'Drag an image or <br>click here to select a file',
    tap: 'Tap here to select a photo <br>from your gallery',
    change: 'Change Photo',
    remove: 'Remove Photo',
    select: 'Select a Photo',
    selected: '<p>Photo successfully selected!</p>',
    fileSize: 'The file size exceeds the limit',
    fileType: 'This file type is not supported.',
    aspect: 'Landscape/Portrait'
  }
}

export default {
  data () {
    return {
      initializeValue: ''
    }
  },
  computed: {
    config () {
      return extend(true, {}, defaults, this.definition.config)
    }
  },
  created () {
    this.initialize = true

    this.$watch('value', newValue => {
      if (this.initialize) {
        this.initializeValue = newValue
        this.initialize = false
      }
    }, {
      immediate: true
    })
  },
  methods: {
    onChange (image) {
      const { config } = this

      if (image && config.action) {
        config.action(image).then(uri => {
          if (uri) {
            this.value = uri
          }
        }).catch(err => {
          console.error(err)
        })
      }
    }
  },
  mixins: [basicMixin],
  components: {
    PictureInput
  }
}
</script>
