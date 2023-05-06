import { assert } from 'chai';

const add = function (n1, n2) {
  return parseFloat(n1) + parseFloat(n2)
}

if (Meteor.isServer) {
  describe('add function', function () {
    it('should add two numbers correctly', function () {
      const result = add(2, 3)
      assert.equal(result, 5)
    })
    it('should return NaN if any of the parameters are not numbers', function () {
      const result = add('A', 3)
      assert.isNaN(result)
    })
  })
}
