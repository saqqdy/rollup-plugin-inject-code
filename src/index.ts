import { readFileSync } from 'fs'
// import consola from 'consola'
import type { Plugin } from 'rollup'

export interface Options {
	/**
	 * for es6 import
	 *
	 * @example ''
	 */
	// importModules: Record<string, string | string[]>
	/**
	 * for es6 export
	 *
	 * @example ''
	 */
	// exportModules: Record<string, string | string[]>
	/**
	 * for node require
	 *
	 * @example ''
	 */
	// requireModules: Record<string, string | string[]>
	/**
	 * for node exports
	 *
	 * @example ''
	 */
	// exportsModules: Record<string, string | string[]>
	path: string
	position?: 'before' | 'after'
}

/**
 * A rollup plugin for inject codes
 *
 * @param options - options
 * @returns Plugin - injectCode plugin
 */
export default function injectCode(options: Options): Plugin {
	if (!options.path) throw new Error('path is required')
	return {
		name: 'inject-code',
		renderChunk(code) {
			const resolvedUrl = require.resolve(options.path, {
				paths: [process.cwd()]
			})
			// consola.info('[INJECT_CODE_INFO] resolvedUrl: ', resolvedUrl)

			const INJECT_CODE = readFileSync(resolvedUrl, { encoding: 'utf-8' })
			return options.position === 'after'
				? `${code.replace(/;*$/, ';')}\n${INJECT_CODE}`
				: `${INJECT_CODE.replace(/;*$/, ';')}\n${code}`
		}
	}
}
