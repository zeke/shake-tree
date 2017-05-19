# shake-tree 

Shake the tastiest fruits from your deep object tree

## Why?

This module is used by the [Electron](https://electron.atom.io) team to
help internationalize our documentation. We parse all of our 
[API docs](https://github.com/electron/electron/tree/master/docs)
into a 
[structured format](https://electron.atom.io/blog/2016/09/27/api-docs-json-schema)
that looks a bit like this:

```js
{
  name: 'BrowserWindow',
  description: 'Create and control browser windows.',
  process: {
    main: true,
    renderer: false
  },
  type: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'http://electron.atom.io/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window.md',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

Some parts of this structured data (like method names and arguments) needs to 
stay in English, whereas other parts of it (like descriptions) need to
extracted for translation into other languages.

That's where `shake-tree` comes in. It gives us a way to extract just
the content we need from this deep object.

## Installation

With npm:

```sh
npm install shake-tree --save
```

With Yarn:

```sh
yarn add shake-tree
```

## Usage

```js
const shakeTree = require('shake-tree')

// Given some arbitrarily-shaped object tree:
const input = {
  a: 'just a string',
  b: {
    description: 'this is b description'
  },
  c: {
    title: 'this is c title',
    description: 'this is c description',
    descriptionExtended: 'this is the extended description'
  }
}

// You can pull out just the values you want by key:
const output = shakeTree(input, 'description')

console.log(output)
// { b: { description: 'this is b description' },
//   c: { description: 'this is c description' } }

// You can also specify multiple keys to match:
shakeTree(input, ['description', 'title'])
```

## Tests

```sh
npm install
npm test
```

## Dependencies

- [flat](https://github.com/hughsk/flat): Take a nested Javascript object and flatten it, or unflatten an object with delimited keys
- [lodash.set](http://ghub.io/lodash.set): The lodash method `_.set` exported as a module.

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [electron-api-docs](): Electron&#39;s API documentation in a structured JSON format
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [standard-markdown](): Test your Markdown files for Standard JavaScript Style™


## License

MIT
