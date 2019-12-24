const {
  parseOptions,
  getFormatedFields,
  parseRange,
  getLines
  // checkValidation
} = require("./cutLib");

const performStdFlow = function(data, options, log) {
  const line = data.trim();
  const range = parseRange(options.fields);
  const formatedFields = getFormatedFields(line, options.delimiter, range);
  log(formatedFields);
};

const performReadFlow = function(chunk, options, log) {
  const lines = getLines(chunk);
  const delimiter = options.delimiter;
  const range = parseRange(options.fields);
  const fields = lines.map(line => getFormatedFields(line, delimiter, range));
  log(fields.join("\n"));
};

const executeCmnd = function(args, fsTool, display, stdin) {
  const options = parseOptions(args);
  // const validation = checkValidation(args, options, fsTool.exists);
  // if (validation.isError) {
  // }
  if (!options.path) {
    stdin.setEncoding("utf8");
    stdin.on("data", data => {
      performStdFlow(data, options, display.log);
    });
    return;
  }
  fsTool.read(options.path, "utf8", (err, chunk) => {
    performReadFlow(chunk, options, ioTool.log);
  });
};

module.exports = {
  executeCmnd,
  performReadFlow: performReadFlow,
  performStdFlow: performStdFlow
};
