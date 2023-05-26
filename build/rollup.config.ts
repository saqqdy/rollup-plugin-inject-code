import { sep } from 'node:path'
import type { RollupOptions } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from '../package.json' assert { type: 'json' }
import { banner, extensions, reporter } from './config'

const nodeResolver = nodeResolve({
	// Use the `package.json` "browser" field
	browser: false,
	extensions,
	preferBuiltins: true,
	exportConditions: ['node'],
	moduleDirectories: ['node_modules']
})

const options: RollupOptions = {
	plugins: [
		nodeResolver,
		babel({
			babelHelpers: 'bundled',
			extensions,
			exclude: [/node_modules[\\/]core-js/]
		}),
		commonjs({
			sourceMap: false,
			exclude: ['core-js']
		}),
		typescript({
			compilerOptions: {
				declaration: false,
				sourceMap: true
			}
		}),
		filesize({ reporter }),
		visualizer()
	]
}

function externalCjsEsm(id: string) {
	return ['terser', 'consola', 'js-cool', 'tslib', 'core-js', '@babel/runtime'].some(
		k => id === k || new RegExp('^' + k + sep).test(id)
	)
}

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				exports: 'auto',
				format: 'cjs',
				sourcemap: true,
				banner
			},
			{
				file: pkg.module,
				exports: 'auto',
				format: 'es',
				sourcemap: true,
				banner
			}
		],
		external: externalCjsEsm,
		...options
	}
]
