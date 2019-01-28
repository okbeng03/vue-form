import base from './rollup.config.base'

const config = Object.assign({}, base, {
	output: {
		file: 'dist/vue-jsonschema-form.esm.js',
		format: 'es',
	},
})

export default config
