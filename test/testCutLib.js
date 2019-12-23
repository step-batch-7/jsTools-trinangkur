const {
  formatLines,
  getLines,
  getFormatedFields,
  parseOptions
} = require("../src/cutLib");
const assert = require("chai").assert;

describe("formatLines", function() {
  it("for a given list should join them with new line", function() {
    const actual = formatLines([1, 2, 3]);
    assert.strictEqual(actual, "1\n2\n3");
  });
  it("for a given empty list should return empty stirng", function() {
    const actual = formatLines([]);
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

describe("getFormatedFields", function() {
  it("should get fileds for a given range", function() {
    const actual = getFormatedFields("ab cf ef", " ", [1, 2, 8]);
    assert.strictEqual(actual, "ab cf");
  });
  it("should get emoty strign if given range is not there", function() {
    const actual = getFormatedFields("ab cf ef", "f", [10]);
    assert.strictEqual(actual, "");
  });
});

describe("parseOptions", function() {
  it("should return options for given arguement", function() {
    const actual = parseOptions(["-d", " ", "-f", "1", "state.txt"]);
    const expected = {
      options: { path: "state.txt", delimeter: " ", fields: "1" }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("path shuould have undefined when no file name is given", function() {
    const actual = parseOptions(["-d", " ", "-f", "1"]);
    const expected = {
      options: { path: undefined, delimeter: " ", fields: "1" }
    };
    assert.deepStrictEqual(actual, expected);
  });
});
