<template>
  <form class="form-horizontal spark-form" @submit.prevent>
    <form-group v-for="group in definition" :definition="group"></form-group>
  </form>
</template>

<script>
import '../factory/factory.js'
import '../basic/fieldset.js'
import '../basic/array.js'
import '../basic/inline.js'
import '../basic/tab.js'

export default {
  vuex: {
    getters: {
      definition: state => state.definition
    }
  }
}
</script>
