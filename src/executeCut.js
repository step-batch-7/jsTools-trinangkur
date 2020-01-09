const { getFormatedFields, parseCutOptions } = require('./cutLib');
const { Parser } = require('./parser');

const performCut = function({ delimiter, fields }, display, data) {
  const chunk = data.toString();
  const lines = chunk.split('\n');
  const formatedFields = lines.map(line =>
    getFormatedFields(line, delimiter, fields)
  );
  display({ message: formatedFields.join('\n') + '\n', error: '' });
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
  display({ message: '', error: errorLine + '\n' });
};

const cut = function(args, display, streamPicker) {
  const parser = new Parser({ '-f': 'fields', '-d': 'delimiter' });
  const options = parseCutOptions(parser.parse(args));
  if (options.isError) {
    process.exitCode = 1;
    display({ message: '', error: options.errorMsg + '\n' });
    return;
  }

  const chosenStream = streamPicker.pick(options.path);

  const performStream = () => {
    chosenStream.resume();
    chosenStream.on('data', performCut.bind(null, options, display));
    chosenStream.on('error', sendError.bind(null, options.path, display));
  };

  performStream();
};

module.exports = {
  cut
};
