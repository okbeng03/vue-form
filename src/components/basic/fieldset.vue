<template>
  <div class="fieldset">
    <form-group v-for="group in definition.items" :definition="group" :key="`${group.key ? group.key.join('.') : ''}-${idx}`">
    </form-group>
  </div>
</template>

<script>
import objectMixin from '../mixins/object.js'

export default {
  mixins: [objectMixin]
}
</script>

