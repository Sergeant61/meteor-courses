import { assert } from 'chai'

describe('simple-todos-blaze', function () {
  it('package.json has correct name', async function () {
    const { name } = await import('../../package.json')
    assert.equal(name, 'simple-todos-blaze')
  })

  if (Meteor.isClient) {
    it('client is not server', function () {
      assert.equal(Meteor.isServer, false)
    })
  }

  if (Meteor.isServer) {
    it('server is not client', function () {
      assert.equal(Meteor.isClient, false)
    })
  }
})
