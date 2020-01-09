const { Parser } = require('../src/parser.js');
const { assert } = require('chai');

describe('Parser', function() {
  context('parse', function() {
    let parser;
    beforeEach(() => {
      parser = new Parser({ '-f': 'fields', '-d': 'delimiter' });
    });
    it('should parse command line arguments into an object', () => {
      const actual = parser.parse(['-d', ',', '-f', '1', 'filePath']);
      assert.deepStrictEqual(actual, {
        delimiter: ',',
        fields: '1',
        path: 'filePath'
      });
    });
    it('should take delimiter as tab if not given through arguments', () => {
      const actual = parser.parse(['-f', '1', 'filePath']);
      assert.deepStrictEqual(actual, {
        delimiter: '\t',
        fields: '1',
        path: 'filePath'
      });
    });
  });
});
