const getFilePath = function(args) {
  const divisor = 2;
  const remainder = 0;
  if (args.length % divisor === remainder) {
    return;
  }
  const one = 1;
  return args[args.length - one];
};

const getErrorMessage = function(filePath) {
  const error = {};
  error.delimiter = 'cut: bad delimiter';
  error.file = `cut: ${filePath}: No such file or directory`;
  error.options =
    'usage: cut -b list [-n] [file ...]' +
    '\ncut -c list [file ...]' +
    '\ncut -f list [-s] [-d delim] [file ...]';
  return error;
};

const checkValidation = function(options) {
  const error = getErrorMessage(options.path);
  const delimiterLength = 1;
  if (options.delimiter.length !== delimiterLength) {
    return { isError: true, errorMsg: error.delimiter };
  }
  if (!options.fields) {
    return { isError: true, errorMsg: error.options };
  }
  return { isError: false, errorMsg: null };
};

const parseOptions = function(args) {
  const one = 1;
  const options = {};
  options.path = getFilePath(args);
  options.delimiter = args.includes('-d')
    ? args[args.indexOf('-d') + one]
    : '\t';
  options.fields = args.includes('-f')
    ? parseRange(args[args.indexOf('-f') + one])
    : undefined;
  return options;
};

const getFormatedFields = function(line, delimiter, range) {
  const one = 1;
  const allFields = line.split(delimiter);
  if (allFields.length === one) {
    return line;
  }
  const desiredFields = range.map(number => allFields[number - one]);
  return desiredFields.filter(field => field).join(delimiter);
};

const parseRange = function(fields) {
  return [+fields];
};

module.exports = {
  getFormatedFields,
  parseOptions,
  checkValidation
};
