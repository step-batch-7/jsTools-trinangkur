const {
  parseOptions,
  getFormatedFields,
  checkValidation
} = require("./cutLib");

const performCut = function(display, data) {
  const chunk = data.toString();
  const lines = chunk.split("\n");
  const formatedFields = lines.map(line =>
    getFormatedFields(line, this.delimiter, this.fields)
  );
  display({ message: formatedFields.join("\n") });
};

const sendError = function(path, display, error) {
  const errorList = {
    ENOENT: {
      message: `cut: ${path}: No such file or directory`,
      code: 1
    },
    EISDIR: { message: `cut: Error reading ${path}`, code: 74 },
    EACCES: { message: `cut: ${path}: Permission denied`, code: 1 }
  };
  const errorLine = errorList[error.code].message;
  const exitCode = errorList[error.code].code;
  process.exitCode = exitCode;
  display({ err: errorLine });
};

const cut = function(args, display, createReadStream, rl) {
  const options = parseOptions(args);
  const validation = checkValidation(options);
  if (validation.isError) {
    display({ err: validation.errorMsg });
    return;
  }
  let chosenStream = rl;
  if (options.path) {
    chosenStream = createReadStream(options.path);
  }
  chosenStream.resume();
  chosenStream.on("data", performCut.bind(options, display));
  chosenStream.on("error", sendError.bind(null, options.path, display));
};

module.exports = {
  cut
};
