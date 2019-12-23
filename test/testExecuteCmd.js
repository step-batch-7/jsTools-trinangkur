const {
  performReadStream,
  performStdStream,
  executeCmnd
} = require("../src/executeCmnd");
const assert = require("chai").assert;

describe("executeCmnd", function() {
  it("stdin should get desired arguments when file path is not there", function() {
    const on = (data, performStdStream) => {
      assert.strictEqual(data, "data");
    };
    const setEncoding = code => {
      assert.strictEqual(code, "utf8");
    };
    executeCmnd(["-d", " ", "-f", "1"], { stdin: { on, setEncoding } });
  });
  it("reader should get desired arguments when file path not there", function() {
    const reader = function(path, encoder) {
      assert.strictEqual(path, "anyPath");
      assert.strictEqual(encoder, "utf8", performStdStream);
    };
    executeCmnd(["-d", " ", "-f", "1", "anyPath"], { reader });
  });
  describe("performReadStream", function() {
    it("log should get desired fields for read stream", function() {
      const log = stream => {
        assert.strictEqual(stream, "ab\ncd");
      };
      const chunk = "ab-cd\ncd-ab";
      const options = { path: "anyPath", delimeter: "-", fields: "1" };
      performReadStream(chunk, options, log);
    });
  });
  describe("performStdStream", function() {
    it("log should get desired fields for std stream", function() {
      const log = stream => {
        assert.strictEqual(stream, "cd");
      };
      const data = "cd-ab\n";
      const options = { path: "anyPath", delimeter: "-", fields: "1" };
      performStdStream(data, options, log);
    });
  });
});
