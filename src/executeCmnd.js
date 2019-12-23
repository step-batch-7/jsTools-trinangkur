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

const executeCmnd = function(args, ioTool) {
  const cutInfo = parseOptions(args);

  if (!cutInfo.options.path) {
    ioTool.stdin.setEncoding("utf8");
    ioTool.stdin.on("data", data => {
      performStdStream(data, cutInfo.options, ioTool.log);
    });
    return;
  }
  ioTool.reader(cutInfo.options.path, "utf8", (err, chunk) => {
    performReadStream(chunk, cutInfo.options, ioTool.log);
  });
};

module.exports = { executeCmnd, performReadStream, performStdStream };
