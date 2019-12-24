const {
  parseOptions,
  getFormatedFields,
  parseRange,
  getLines,
  checkValidation
} = require("./cutLib");

const performStdFlow = function(line, options, disPlay) {
  const range = parseRange(options.fields);
  const formatedFields = getFormatedFields(line, options.delimiter, range);
  disPlay({ message: formatedFields });
};

const performReadFlow = function(chunk, options, display) {
  const lines = getLines(chunk);
  const delimiter = options.delimiter;
  const range = parseRange(options.fields);
  const fields = lines.map(line => getFormatedFields(line, delimiter, range));
  display({ message: fields.join("\n") });
};

const manageCut = function(args, fs, display, rl) {
  const options = parseOptions(args);
  const validation = checkValidation(args, options, fs.existsSync);
  if (validation.isError) {
    display({ err: validation.errorMsg });
    return;
  }
  if (!options.path) {
    rl.resume();
    rl.on("line", data => {
      performStdFlow(data, options, display);
    });
    return;
  }
  fs.readFile(options.path, "utf8", (err, chunk) => {
    performReadFlow(chunk, options, display);
  });
};

module.exports = {
  manageCut,
  performReadFlow,
  performStdFlow
};
