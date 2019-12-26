const {
  parseOptions,
  getFormatedFields,
  checkValidation
} = require("./cutLib");

const performStdFlow = function(display, line) {
  const formatedFields = getFormatedFields(line, this.delimiter, this.fields);
  display({ message: formatedFields });
};

const performReadFlow = function(display, err, chunk) {
  const lines = chunk.split("\n");
  const delimiter = this.delimiter;
  const fields = lines.map(line =>
    getFormatedFields(line, delimiter, this.fields)
  );
  display({ message: fields.join("\n") });
};

const cut = function(args, fs, display, rl) {
  const options = parseOptions(args);
  const validation = checkValidation(options, fs.existsSync);
  if (validation.isError) {
    display({ err: validation.errorMsg });
    return;
  }
  if (!options.path) {
    rl.resume();
    rl.on("line", performStdFlow.bind(options, display));
    return;
  }
  fs.readFile(options.path, "utf8", performReadFlow.bind(options, display));
};

module.exports = {
  cut,
  performReadFlow,
  performStdFlow
};
