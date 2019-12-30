const {
  parseOptions,
  getFormatedFields,
  checkValidation
} = require('./cutLib');

const performCut = function(display, data) {
  const chunk = data.toString();
  const lines = chunk.split('\n');
  const formatedFields = lines.map(line =>
    getFormatedFields(line, this.delimiter, this.fields)
  );
  display({ message: formatedFields.join('\n') + '\n', err: '' });
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
  display({ message: '', err: errorLine + '\n' });
};

const performStream = function(chosenStream, options, display) {
  chosenStream.resume();
  chosenStream.on('data', performCut.bind(options, display));
  chosenStream.on('error', sendError.bind(null, options.path, display));
};

const cut = function(args, display, createReadStream, rl) {
  const options = parseOptions(args);
  const validation = checkValidation(options);
  if (validation.isError) {
    process.exitCode = 1;
    display({ message: '', err: validation.errorMsg + '\n' });
    return;
  }
  let chosenStream = rl;
  if (options.path) {
    chosenStream = createReadStream(options.path);
  }
  performStream(chosenStream, options, display);
};

module.exports = {
  cut
};
