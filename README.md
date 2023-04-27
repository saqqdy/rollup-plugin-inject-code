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

```js
// rollup.config.js
import injectCode from 'rollup-plugin-inject-code'

export default {
  plugins: [
    injectCode({
      Promise: ['es6-promise', 'Promise']
    })
  ]
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
