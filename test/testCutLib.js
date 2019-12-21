const { getFieldsToDisplay } = require("../src/cutLib");
const assert = require("assert");

describe("getFieldsToDisplay", function() {
  it("for a given list should join them with new line", function() {
    const actual = getFieldsToDisplay([1, 2, 3]);
    assert.strictEqual(actual, "1\n2\n3");
  });
});
