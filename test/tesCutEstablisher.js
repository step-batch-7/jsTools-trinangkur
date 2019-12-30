const { cut } = require('../src/cutEstablisher');
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

    const display = function(output) {
      assert.oneOf(output.message, ['a', 'a-b', '']);
      assert.isUndefined(output.err);
    };

    cut(['-d', ' ', '-f', '1', 'anyPath'], display, createReadStream, {});
    mockedEmitter.emit('data', 'a b');
    mockedEmitter.emit('data', 'a-b');
    mockedEmitter.emit('data', '');
  });

  it('rl should be in chosenStream when file path is not given', function() {
    const mockedEmitter = new Events();
    mockedEmitter.resume = () => {};

    const display = function(output) {
      assert.oneOf(output.message, ['a', 'a-b', '']);
      assert.isUndefined(output.err);
    };

    cut(['-d', ' ', '-f', '1'], display, () => {}, mockedEmitter);
    mockedEmitter.emit('data', 'a b');
    mockedEmitter.emit('data', 'a-b');
    mockedEmitter.emit('data', '');
  });
  it('rl should be in chosenStream when file path is not given', function() {
    const mockedEmitter = new Events();
    mockedEmitter.resume = () => {};

    const display = function(output) {
      assert.oneOf(output.message, ['a', 'a-b', '']);
      assert.isUndefined(output.err);
    };

    cut(['-d', ' ', '-f', '1'], display, () => {}, mockedEmitter);
    mockedEmitter.emit('data', 'a b');
    mockedEmitter.emit('data', 'a-b');
    mockedEmitter.emit('data', '');
  });
  it('display should get error message for given wrong argument', function() {
    const mockedEmitter = new Events();
    mockedEmitter.resume = () => {};

    const display = function(output) {
      assert.strictEqual(output.err, 'cut: bad delimiter');
      assert.isUndefined(output.message);
    };

    cut(['-d', '', '-f', '1'], display, () => {}, mockedEmitter);
  });

  it('incase of reading file error event should emit for error', function() {
    const mockedEmitter = new Events();
    mockedEmitter.resume = () => {};

    const createReadStream = path => {
      assert.strictEqual(path, 'wrongPath');
      return mockedEmitter;
    };

    const display = function(output) {
      assert.strictEqual(
        output.err,
        'cut: wrongPath: No such file or directory'
      );
      assert.isUndefined(output.message);
    };
    cut(
      ['-d', ' ', '-f', '1', 'wrongPath'],
      display,
      createReadStream,
      mockedEmitter
    );
    mockedEmitter.emit('error', { code: 'ENOENT' });
  });
});
