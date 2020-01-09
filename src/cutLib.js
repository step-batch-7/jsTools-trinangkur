const getFilePath = function(args) {
  const divisor = 2;
  const remainder = 0;
  if (args.length % divisor === remainder) {
    return;
  }
  const lastIndex = -1;
  return args[args.length + lastIndex];
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

const checkError = function(options) {
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

const parseCutOptions = function(options) {
  const validator = checkError(options);
  if (validator.isError) {
    return validator;
  }
  options.fields = parseRange(options.fields);
  return options;
};

const parseOptions = function(args) {
  const next = 1;
  const options = {};
  options.path = getFilePath(args);
  options.delimiter = args.includes('-d')
    ? args[args.indexOf('-d') + next]
    : '\t';
  options.fields = args.includes('-f')
    ? parseRange(args[args.indexOf('-f') + next])
    : undefined;
  return options;
};

const getFormatedFields = function(line, delimiter, range) {
  const singleFieldLength = 1;
  const allFields = line.split(delimiter);
  if (allFields.length === singleFieldLength) {
    return line;
  }
  const desiredFields = range.map(
    number => allFields[number - singleFieldLength]
  );
  return desiredFields.filter(field => field).join(delimiter);
};

const parseRange = function(fields) {
  return [+fields];
};

module.exports = {
  getFormatedFields,
  parseOptions,
  checkError,
  parseCutOptions
};
