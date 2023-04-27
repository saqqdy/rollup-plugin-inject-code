import { readFileSync } from 'fs'
import type { Plugin } from 'rollup'

export interface Options {
	shebang?: string
	skipBackslash?: boolean
	type?: 'before' | 'after'
}

/**
 * A rollup plugin for inject codes
 *
 * @param options - 配置参数
 * @returns Plugin - 插件
 */
export default function injectCode(options: Options = {}): Plugin {
	return {
		name: 'inject-code',
		renderChunk(code) {
			const injectCode = readFileSync(
				require.resolve(
					'/Users/saqqdy/www/saqqdy/rollup-plugin-inject-code/test.bak.js'
				),
				'utf-8'
			)
			return `${injectCode};\n;${code}`
		}
	}
}
