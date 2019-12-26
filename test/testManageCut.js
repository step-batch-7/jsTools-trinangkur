const {
  performReadFlow,
  performStdFlow,
  cut
} = require("../src/cutEstablisher");
const assert = require("chai").assert;

describe("cut", function() {
  const display = function(outPut) {
    assert.strictEqual(outPut.message, "ab\ncd");
  };
  const readFile = function(path, encoder) {
    assert.strictEqual(path, "anyPath");
    assert.strictEqual(encoder, "utf8", performStdFlow);
  };
  const on = () => {};
  const resume = () => {};
  const existsSync = function(path) {
    assert.strictEqual(path, "anyPath");
    return true;
  };
  it("stdin should get desired arguments when file path is not there", function() {
    cut(["-d", " ", "-f", "1"], { readFile, existsSync }, display, {
      on,
      resume
    });
  });
  it("reader should get desired arguments when file path is there", function() {
    cut(["-d", " ", "-f", "1", "anyPath"], { readFile, existsSync }, display, {
      on,
      resume
    });
  });
  it("display should get error stream for given wrong arguments", function() {
    const display = function(outPut) {
      assert.strictEqual(outPut.err, "cut: bad delimiter");
    };
    cut(["-d", "", "-f", "1", "anyPath"], { readFile, existsSync }, display, {
      on,
      resume
    });
  });
  describe("performReadFlow", function() {
    it("log should get desired fields for read stream", function() {
      const display = function(outPut) {
        assert.strictEqual(outPut.message, "ab\ncd");
      };
      const chunk = "ab-cd\ncd-ab";
      const options = { path: "anyPath", delimiter: "-", fields: "1" };
      const err = null;
      performReadFlow.call(options, display, err, chunk);
    });
  });
  describe("performStdFlow", function() {
    it("log should get desired fields for std stream", function() {
      const display = function(outPut) {
        assert.strictEqual(outPut.message, "cd");
      };
      const data = "cd-ab";
      const options = { path: "anyPath", delimiter: "-", fields: "1" };
      performStdFlow.call(options, display, data);
    });
  });
});
