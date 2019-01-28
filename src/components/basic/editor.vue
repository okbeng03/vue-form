<template>
  <v-editor
    v-model="value"
    :disabled="definition.disabled"
    :init="config.init"
  >
  </v-editor>
</template>

<script>
import vEditor from '@tinymce/tinymce-vue'
import extend from 'extend'
import basicMixin from '../mixins/basic.js'

const plugins = [
  'lists',
  'advlist',
  'image',
  'table',
  'textcolor',
  'colorpicker',
  'codesample',
  'contextmenu',
  'link',
  'fullscreen',
  'help',
  'preview',
  'searchreplace',
  'hr',
  'wordcount',
  'autosave'
]
const toolbars = [
  'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | table hr link image | searchreplace | fullscreen preview help'
]

const defaults = {
  init: {
    height: 500,
    contextmenu: 'link image inserttable | cell row column deletetable',
    default_link_target: '_blank'
  }
}

export default {
  computed: {
    config () {
      const config = this.definition.config || {}
      let plugin = plugins.slice()
      let toolbar = toolbars.slice()

      if (config.plugins) {
        plugin = plugin.concat(config.plugins.split(' '))
        plugin = _.uniq(plugin)
        delete config.plugins
      }

      if (config.toolbar) {
        toolbar.push(config.toolbar)
        delete config.toolbar
      }

      return extend(true, {}, defaults, config, {
        init: {
          plugins: plugin.join(' '),
          toolbar: toolbar
        }
      })
    }
  },
  mixins: [basicMixin],
  components: {
    vEditor
  }
}
</script>

