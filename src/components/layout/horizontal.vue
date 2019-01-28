<template>
  <form class="form-horizontal" @submit.prevent>
    <form-group v-for="(group, idx) in definition" :definition="group" :key="`${group.key ? group.key.join('.') : ''}-${idx}`"></form-group>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import '../factory/factory.js'
import '../basic/fieldset.js'
import '../basic/array.js'
import '../basic/inline.js'

export default {
  computed: mapState({
    definition: state => state.definition
  })
}
</script>
