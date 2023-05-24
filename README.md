<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Doc History

<!-- [![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href] -->

Track Firestore Document Versions with Ease

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

<!-- ## Features

- 🪄 &nbsp;Track Firestore Document Versions with Ease -->

## Quick Setup

1. Add `doc-history` dependency to your project

```bash
# Using yarn
yarn add https://github.com/classicneupane/doc-history
```

2. Add `@tn/doc-history` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@tn/doc-history'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Config

```js
  export default defineNuxtConfig({
    documentHistory: {
      app: 'APP_NAME',
      collection: 'firebase collection to keep track of document changes, default: document_history'
    }
  })
```

<!-- Badges -->
<!-- [npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/my-module

[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/my-module

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/my-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com -->
