const { assert } = require('chai');
const {
  getFromTwo,
  getFirstElement,
  getLastElement
} = require('../src/arrayMethods');

describe('getFromTwo', function() {
  it('should get all elements excluding first two elements', function() {
    assert.deepStrictEqual(getFromTwo([1, 2, 4, 5]), [4, 5]);
  });
  it('should get empty array for given list length smaller than 3', function() {
    assert.deepStrictEqual(getFromTwo([1, 2]), []);
    assert.deepStrictEqual(getFromTwo([1]), []);
  });
});

describe('getFirstElement', function() {
  it('should get first element for given any list', function() {
    assert.strictEqual(getFirstElement([1, 2, 3]), 1);
  });
  it('should get undefined for given empty list', function() {
    assert.isUndefined(getFirstElement([]));
  });
});

describe('getLastElement', function() {
  it('should get last element for a given list', function() {
    assert.strictEqual(getLastElement([1, 2, 3, 4]), 4);
  });
  it('should get undefined for given empty list', function() {
    assert.isUndefined(getLastElement([]));
  });
});
