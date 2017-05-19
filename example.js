const shakeTree = require('.')

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
