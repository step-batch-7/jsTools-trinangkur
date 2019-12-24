const {
  parseOptions,
  getFormatedFields,
  parseRange,
  getLines
} = require("./cutLib");

const performStdFlow = function(data, options, log) {
  const line = data.trim();
  const range = parseRange(options.fields);
  const formatedFields = getFormatedFields(line, options.delimeter, range);
  log(formatedFields);
};

const performReadFlow = function(chunk, options, log) {
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
      performStdFlow(data, cutInfo.options, ioTool.log);
    });
    return;
  }
  ioTool.read(cutInfo.options.path, "utf8", (err, chunk) => {
    performReadFlow(chunk, cutInfo.options, ioTool.log);
  });
};

module.exports = {
  executeCmnd,
  performReadFlow: performReadFlow,
  performStdFlow: performStdFlow
};
