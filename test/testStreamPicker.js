const StreamPicker = require('../src/streamPicker');
const { assert } = require('chai');

describe('StreamPicker', function() {
  it.only('should get readStream for a given path', function() {
    const readStream = {};
    const creatReadStream = path => {
      assert.strictEqual(path, 'givenPath');
      return readStream;
    };
    const rl = {};
    const streamPicker = new StreamPicker(creatReadStream, rl);
    assert.strictEqual(streamPicker.pick('givenPath'), readStream);
  });
  it.only('should get rl for not given path', function() {
    const readStream = {};
    const creatReadStream = path => {
      assert.strictEqual(path, 'givenPath');
      return readStream;
    };
    const rl = {};
    const streamPicker = new StreamPicker(creatReadStream, rl);
    assert.strictEqual(streamPicker.pick(undefined), rl);
  });
});
