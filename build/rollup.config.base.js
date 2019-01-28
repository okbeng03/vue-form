import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'

const config = require('../package.json')

export default {
	input: 'src/index.js',
	name: 'vue-jsonschema-form',
	external: ['vue', 'lodash', 'vuex'],
	plugins: [
		postcss({
			extensions: ['.css', '.less']
    }),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		cjs({
			include: 'node_modules/**',
		}),
		vue({
			css (style) {
			},
		}),
		babel({
			exclude: 'node_modules/**',
			'plugins': [
				'external-helpers',
			],
		}),
		replace({
			VERSION: JSON.stringify(config.version),
		}),
		json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      include: 'node_modules/**',
      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false
      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',
      // ignores indent and generates the smallest code
      compact: true, // Default: false
      // generate a named export for every property of the JSON object
      namedExports: true // Default: true
    })
	],
	watch: {
		include: 'src/**',
	},
}
