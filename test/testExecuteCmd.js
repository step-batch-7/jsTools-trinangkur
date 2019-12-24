const {
  performReadFlow,
  performStdFlow,
  executeCmnd
} = require("../src/executeCmnd");
const assert = require("chai").assert;

describe("executeCmnd", function() {
  it("stdin should get desired arguments when file path is not there", function() {
    const on = (data, performStdFlow) => {
      assert.strictEqual(data, "data");
    };
    const setEncoding = code => {
      assert.strictEqual(code, "utf8");
    };
    executeCmnd(["-d", " ", "-f", "1"], {}, {}, { on, setEncoding });
  });
  it("reader should get desired arguments when file path not there", function() {
    const read = function(path, encoder) {
      assert.strictEqual(path, "anyPath");
      assert.strictEqual(encoder, "utf8", performStdFlow);
    };
    executeCmnd(["-d", " ", "-f", "1", "anyPath"], { read }, {}, {});
  });
  describe("performReadFlow", function() {
    it("log should get desired fields for read stream", function() {
      const log = stream => {
        assert.strictEqual(stream, "ab\ncd");
      };
      const chunk = "ab-cd\ncd-ab";
      const options = { path: "anyPath", delimiter: "-", fields: "1" };
      performReadFlow(chunk, options, log);
    });
  });
  describe("performStdFlow", function() {
    it("log should get desired fields for std stream", function() {
      const log = stream => {
        assert.strictEqual(stream, "cd");
      };
      const data = "cd-ab\n";
      const options = { path: "anyPath", delimiter: "-", fields: "1" };
      performStdFlow(data, options, log);
    });
  });
});
