const { formatFields, getLines, getFileds } = require("../src/cutLib");
const assert = require("chai").assert;

describe("formatFields", function() {
  it("for a given list should join them with new line", function() {
    const actual = formatFields([1, 2, 3]);
    assert.strictEqual(actual, "1\n2\n3");
  });
  it("for a given empty list should return empty stirng", function() {
    const actual = formatFields([]);
    assert.strictEqual(actual, "");
  });
});

describe("getLines", function() {
  it("should get every fileds seperated by new line", function() {
    const actual = getLines("abc\ncd");
    assert.deepStrictEqual(actual, ["abc", "cd"]);
  });
  it("should return whole chunk in one array if the no new line is there", function() {
    const actual = getLines("abcd");
    assert.deepStrictEqual(actual, ["abcd"]);
  });
});

describe("getFields", function() {
  it("should get fileds for a given range", function() {
    const actual = getFileds("ab cf ef", " ", [1, 2]);
    assert.deepStrictEqual(actual, ["ab", "cf"]);
  });
});
