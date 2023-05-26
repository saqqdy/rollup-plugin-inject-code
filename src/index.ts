import { readFileSync } from 'fs'
import { type MinifyOptions, minify } from 'terser'
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
	position?: 'before' | 'after'
	/**
	 * A string to prepend to the bundle
	 */
	intro?: string
	/**
	 * A string to append to the bundle
	 */
	outro?: string
	/**
	 * minify the codes
	 */
	minify?: boolean
	/**
	 * minify options for terser
	 */
	minifyOptions?: MinifyOptions
}

export interface OptionsPath extends Options {
	/**
	 * inject code path
	 * @description Only one of “path” and “code” needs to be passed in, and "path" has higher priority than "code" when both are passed in
	 */
	path: string
}

export interface OptionsCode extends Options {
	/**
	 * inject code string
	 * @description Only one of “path” and “code” needs to be passed in, and "path" has higher priority than "code" when both are passed in
	 */
	code: string
}

/**
 * A rollup plugin for inject codes
 *
 * @param options - options
 * @returns Plugin - injectCode plugin
 */
function injectCode(options: OptionsPath): Plugin
function injectCode(options: OptionsCode): Plugin
function injectCode(options: OptionsPath | OptionsCode): Plugin {
	if ('path' in options && !options.path) throw new Error('"path" is required')
	if (!('path' in options) && !('code' in options))
		throw new Error('“path” and "code" must be passed into at least one')

	return {
		name: 'inject-code',
		async renderChunk(code) {
			let injectCode = '',
				map
			if ('path' in options) {
				const resolvedUrl = require.resolve(options.path, {
					paths: [process.cwd()]
				})
				// consola.info('[injectCode] resolvedUrl: ', resolvedUrl)

				injectCode = readFileSync(resolvedUrl, { encoding: 'utf-8' })
			} else if ('code' in options) {
				injectCode = options.code
			}

			injectCode = `${'intro' in options ? options.intro + '\n' : ''}${injectCode}${
				'outro' in options ? '\n' + options.outro : ''
			}`

			if (options.minify) {
				const result = await minify(injectCode, options.minifyOptions)
				injectCode = result.code || ''
				map = typeof result.map === 'string' ? JSON.parse(result.map) : result.map

				return {
					code:
						options.position === 'after'
							? `${code.replace(/;*$/, ';')}\n${injectCode}`
							: `${injectCode.replace(/;*$/, ';')}\n${code}`,
					map
				}
			}

			return options.position === 'after'
				? `${code.replace(/;*$/, ';')}\n${injectCode}`
				: `${injectCode.replace(/;*$/, ';')}\n${code}`
		}
	}
}

export default injectCode
