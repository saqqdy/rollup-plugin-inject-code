<div style="text-align: center;" align="center">

# rollup-plugin-inject-code

A rollup plugin for inject codes

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

## **For API documentation, see: [API Docs](./docs/modules.md)**

</div>

## Installing

```bash
# use pnpm
$ pnpm install -D rollup-plugin-inject-code

# use npm
$ npm install -D rollup-plugin-inject-code

# use yarn
$ yarn add -D rollup-plugin-inject-code
```

## Usage

1. use import

```js
// rollup.config.js
import injectCode from 'rollup-plugin-inject-code'

export default {
  plugins: [
    injectCode({
      path: './node_modules/axios-serializer/dist/index.min.js',
      position: 'before'
    })
  ]
}
```

2. use require

```js
// rollup.config.js
const injectCode = require('rollup-plugin-inject-code')

module.exports = {
  plugins: [
    injectCode({
      path: './node_modules/axios-serializer/dist/index.min.js',
      position: 'before'
    })
  ]
}
```

## Types

```ts
import type { Plugin } from 'rollup'

export interface MinifyOptions {
    compress?: boolean | CompressOptions
    ecma?: ECMA
    enclose?: boolean | string
    ie8?: boolean
    keep_classnames?: boolean | RegExp
    keep_fnames?: boolean | RegExp
    mangle?: boolean | MangleOptions
    module?: boolean
    nameCache?: object
    format?: FormatOptions
    /** @deprecated */
    output?: FormatOptions
    parse?: ParseOptions
    safari10?: boolean
    sourceMap?: boolean | SourceMapOptions
    toplevel?: boolean
}

/**
 * A rollup plugin for inject codes
 *
 * @param options - options
 * @returns Plugin - injectCode plugin
 */
declare function injectCode(options: OptionsPath): Plugin

declare function injectCode(options: OptionsCode): Plugin
export default injectCode

export declare interface Options {
    /**
     * for es6 import
     *
     * @example ''
     */
    /**
     * for es6 export
     *
     * @example ''
     */
    /**
     * for node require
     *
     * @example ''
     */
    /**
     * for node exports
     *
     * @example ''
     */
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

export declare interface OptionsCode extends Options {
    /**
     * inject code string
     * @description Only one of “path” and “code” needs to be passed in, and "path" has higher priority than "code" when both are passed in
     */
    code: string
}

export declare interface OptionsPath extends Options {
    /**
     * inject code path
     * @description Only one of “path” and “code” needs to be passed in, and "path" has higher priority than "code" when both are passed in
     */
    path: string
}
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/rollup-plugin-inject-code/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-inject-code.svg?style=flat-square
[npm-url]: https://npmjs.org/package/rollup-plugin-inject-code
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/rollup-plugin-inject-code/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/rollup-plugin-inject-code&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/rollup-plugin-inject-code.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/rollup-plugin-inject-code?branch=master
[download-image]: https://img.shields.io/npm/dm/rollup-plugin-inject-code.svg?style=flat-square
[download-url]: https://npmjs.org/package/rollup-plugin-inject-code
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_rollup-plugin-inject-code
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_rollup-plugin-inject-code
