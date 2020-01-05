const { cut } = require('../src/executeCut');
const Events = require('events');
const assert = require('chai').assert;

describe('cut', function() {
  it('createReadStream should get anyPath as given path', function() {
    const mockedEmitter = new Events();
    mockedEmitter.resume = () => {};
    const createReadStream = path => {
      assert.strictEqual(path, 'anyPath');
      return mockedEmitter;
    };

    const streamPicker = {
      pick: path => {
        assert.strictEqual(path, 'anyPath');
        return createReadStream(path);
      }
    };

    const display = function(output) {
      assert.oneOf(output.message, ['a\n', 'a-b\n', '\n']);
      assert.isEmpty(output.error);
    };

    cut(['-d', ' ', '-f', '1', 'anyPath'], display, streamPicker);
    mockedEmitter.emit('data', 'a b');
    mockedEmitter.emit('data', 'a-b');
    mockedEmitter.emit('data', '');
  });

  it('rl should be in chosenStream when file path is not given', function() {
    const rl = new Events();
    rl.resume = () => {};
    const streamPicker = {
      pick: path => {
        assert.strictEqual(path, undefined);
        return rl;
      }
    };
    const display = function(output) {
      assert.oneOf(output.message, ['a\n', 'a-b\n', '\n']);
      assert.isEmpty(output.error);
    };

    cut(['-d', ' ', '-f', '1'], display, streamPicker);
    rl.emit('data', 'a b');
    rl.emit('data', 'a-b');
    rl.emit('data', '');
  });
  it('display should get error message for given wrong argument', function() {
    const rl = new Events();
    rl.resume = () => {};

    const display = function(output) {
      assert.strictEqual(output.error, 'cut: bad delimiter\n');
      assert.isEmpty(output.message);
    };

    cut(['-d', '', '-f', '1'], display, { rl });
  });

  it('incase of reading file error event should emit for error', function() {
    const mockedEmitter = new Events();
    mockedEmitter.resume = () => {};

    const createReadStream = path => {
      assert.strictEqual(path, 'wrongPath');
      return mockedEmitter;
    };
    const streamPicker = {
      pick: path => {
        assert.strictEqual(path, 'wrongPath');
        return createReadStream(path);
      }
    };
    const display = function(output) {
      assert.strictEqual(
        output.error,
        'cut: wrongPath: No such file or directory\n'
      );
      assert.isEmpty(output.message);
    };
    cut(['-d', ' ', '-f', '1', 'wrongPath'], display, streamPicker);
    mockedEmitter.emit('error', { code: 'ENOENT' });
  });
});
