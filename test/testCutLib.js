const {
  formatLines,
  getFormatedFields,
  parseOptions,
  parseRange,
  checkValidation
} = require("../src/cutLib");
const assert = require("chai").assert;

describe("formatLines", function() {
  it("for a given list should join them with new line", function() {
    const actual = formatLines([1, 2, 3]);
    assert.strictEqual(actual, "1\n2\n3");
  });
  it("for a given empty list should return empty string", function() {
    const actual = formatLines([]);
    assert.strictEqual(actual, "");
  });
});

describe("getFormatedFields", function() {
  it("should get fields for a given range", function() {
    const actual = getFormatedFields("ab cf ef", " ", [1, 2, 8]);
    assert.strictEqual(actual, "ab cf");
  });
  it("should get empty string if given range is not there", function() {
    const actual = getFormatedFields("ab cf ef", "f", [10]);
    assert.strictEqual(actual, "");
  });
  it("should whole line when the given delimiter is not there", function() {
    const actual = getFormatedFields("ab cf ef", "-", [10]);
    assert.strictEqual(actual, "ab cf ef");
  });
});

describe("parseOptions", function() {
  it("should return options for given argument", function() {
    const actual = parseOptions(["-d", " ", "-f", "1", "state.txt"]);
    const expected = { path: "state.txt", delimiter: " ", fields: [1] };
    assert.deepStrictEqual(actual, expected);
  });
  it("path should have undefined when no file name is given", function() {
    const actual = parseOptions(["-d", " ", "-f", "1"]);
    const expected = { path: undefined, delimiter: " ", fields: [1] };
    assert.deepStrictEqual(actual, expected);
  });
  it("should get tab as delimiter when it is not given", function() {
    const actual = parseOptions(["-f", "1"]);
    const expected = { path: undefined, delimiter: "\t", fields: [1] };
    assert.deepStrictEqual(actual, expected);
  });
  it("should get undefined as field when it is not given", function() {
    const actual = parseOptions(["-d", " "]);
    const expected = { path: undefined, delimiter: " ", fields: undefined };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("parseRange", function() {
  it("should return an array of having all given fields", function() {
    const actual = parseRange("1");
    assert.deepStrictEqual(actual, [1]);
  });
});

describe("checkValidation", function() {
  it("should return an object having isError as false and errorMsg as null when no error is there", function() {
    const doesFileExists = function(path) {
      assert.strictEqual(path, "anyPath");
      return true;
    };
    const actual = checkValidation(
      {
        path: undefined,
        delimiter: ",",
        fields: "1"
      },
      doesFileExists
    );
    assert.deepStrictEqual(actual, { isError: false, errorMsg: null });
  });
  it("should return isError as false when right file name is given ", function() {
    const doesFileExists = function(path) {
      assert.strictEqual(path, "anyPath");
      return true;
    };
    let actual = checkValidation(
      {
        path: "anyPath",
        delimiter: ",",
        fields: "1"
      },
      doesFileExists
    );
    assert.deepStrictEqual(actual, { isError: false, errorMsg: null });
  });
  it("should return isError as true when delimiter is invalid", function() {
    const doesFileExists = function(path) {
      assert.strictEqual(path, "anyPath");
      return true;
    };
    let actual = checkValidation(
      {
        path: "anyPath",
        delimiter: "",
        fields: "1"
      },
      doesFileExists
    );
    assert.deepStrictEqual(actual, {
      isError: true,
      errorMsg: "cut: bad delimiter"
    });
  });
  it("should return isError as true when field is not given", function() {
    const doesFileExists = function(path) {
      assert.strictEqual(path, "anyPath");
      return true;
    };
    let actual = checkValidation(
      {
        path: "anyPath",
        delimiter: ",",
        fields: undefined
      },
      doesFileExists
    );
    assert.deepStrictEqual(actual, {
      isError: true,
      errorMsg:
        "usage: cut -b list [-n] [file ...]\ncut -c list [file ...]\ncut -f list [-s] [-d delim] [file ...]"
    });
  });
  it("should return isError as false when given file path is invalid", function() {
    const doesFileExists = function(path) {
      assert.strictEqual(path, "anyPath");
      return false;
    };
    let actual = checkValidation(
      {
        path: "anyPath",
        delimiter: ",",
        fields: "1"
      },
      doesFileExists
    );
    assert.deepStrictEqual(actual, {
      isError: true,
      errorMsg: "cut: anyPath: No such file or directory"
    });
  });
});
