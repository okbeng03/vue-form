import VueForm from './components/vue-form.vue'
import Store from './vuex/store'
import './css/index.less'

export function install (Vue, options = {}) {
	if (install.installed) return
	install.installed = true

	// const finalOptions = {}
	// merge(finalOptions, defaultOptions, options)

	plugin.options = options
	// vtooltip.options = options

	// if (!options.theme) {
	// 	import Horizontal from './components/layout/horizontal.vue'
	// 	Vue.component('bootstrap', Horizontal)
	// }

	// Vue.directive('tooltip', vtooltip)
	// Vue.directive('close-popover', vclosepopover)
	Vue.component('vue-form', VueForm)
}

export const VueJSONSchemaForm = VueForm
export const store = Store
// export validator

const plugin = {
	install,

	get enabled () {
		return state.enabled
	},

	set enabled (value) {
		state.enabled = value
	}
}

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}

export default plugin
