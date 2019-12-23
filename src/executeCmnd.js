const {
  parseOptions,
  getFormatedFields,
  parseRange,
  getLines
} = require("./cutLib");

const performStdStream = function(data, options, log) {
  const line = data.trim();
  const range = parseRange(options.fields);
  const formatedFields = getFormatedFields(line, options.delimeter, range);
  log(formatedFields);
};

const performReadStream = function(chunk, options, log) {
  const lines = getLines(chunk);
  const delimeter = options.delimeter;
  const range = parseRange(options.fields);
  const fields = lines.map(line => getFormatedFields(line, delimeter, range));
  log(fields.join("\n"));
};

const executeCmnd = function(args, usefulFunc) {
  const cutInfo = parseOptions(args);

  if (!cutInfo.options.path) {
    usefulFunc.stdin.setEncoding("utf8");
    usefulFunc.stdin.on("data", data => {
      performStdStream(data, cutInfo.options, usefulFunc.log);
    });
    return;
  }
  usefulFunc.reader(cutInfo.options.path, "utf8", (err, chunk) => {
    performReadStream(chunk, cutInfo.options, usefulFunc.log);
  });
};

module.exports = { executeCmnd, performReadStream, performStdStream };
