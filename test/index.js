const { before, describe, it } = require('mocha')
const { expect } = require('chai')
const flat = require('flat')
const shakeTree = require('..')
const electronTree = require('electron-api-docs/tree')

describe('shakeTree', () => {
  it('shakes a single specific key out of the tree', () => {
    var input = {
      a: 'bar',
      b: {
        description: 'this is b'
      },
      c: {
        title: 'this is c title',
        descriptionExtended: 'this is the extend description',
        description: 'this is c description'
      }
    }

    var output = {
      b: {
        description: 'this is b'
      },
      c: {
        description: 'this is c description'
      }
    }
    expect(shakeTree(input, 'description')).to.deep.equal(output)
  })

  it('shakes multiple keys out of the tree', () => {
    var input = {
      a: 'bar',
      b: {
        description: 'this is b'
      },
      c: {
        title: 'this is c title',
        descriptionExtended: 'this is the extend description',
        description: 'this is c description'
      }
    }

    var output = {
      b: {
        description: 'this is b'
      },
      c: {
        title: 'this is c title',
        description: 'this is c description'
      }
    }
    expect(shakeTree(input, ['description', 'title'])).to.deep.equal(output)
  })

  describe('big trees', () => {
    let shaken
    let flatDescriptions
    let flatKeys

    before(() => {
      shaken = shakeTree(electronTree, 'description')
      flatDescriptions = flat(shaken)
      flatKeys = Object.keys(flatDescriptions)
    })

    it('has hella values', () => {
      expect(flatKeys.length).to.be.above(100)
    })

    it('only returns target keys that are the end of the path', () => {
      expect(flatKeys.every(key => key.endsWith('.description')))
    })
  })
})
