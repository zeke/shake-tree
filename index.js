const assert = require('assert')
const flat = require('flat')
const set = require('lodash.set')

module.exports = function shakeTree (tree, targetKeys) {
  const list = flat(tree)
  const keys = Object.keys(list)
  const output = {}

  assert.equal(typeof tree, 'object', 'argument `tree` must be an object')
  assert(targetKeys && targetKeys.length, 'argument `targetKeys` must be a key name or array of key names')

  if (typeof targetKeys === 'string') {
    targetKeys = [targetKeys]
  }

  keys
    .filter(key => {
      return list[key] &&
        list[key].length > 0 &&
        targetKeys.some(targetKey => key.split('.').pop() === targetKey)
    })
    .forEach(key => {
      set(output, key, list[key])
    })

  // Go to Stringtown and back to avoid upsetting some YAML formatters
  return JSON.parse(JSON.stringify(output))
}
