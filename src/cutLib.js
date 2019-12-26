const formatLines = function(list) {
  return list.join("\n");
};

const getFilePath = function(args) {
  if (args.length % 2 == 0) return;
  return args[args.length - 1];
};

const getErrorMessage = function(filePath) {
  error = {};
  error.delimiter = "cut: bad delimiter";
  error.file = `cut: ${filePath}: No such file or directory`;
  error.options =
    "usage: cut -b list [-n] [file ...]\ncut -c list [file ...]\ncut -f list [-s] [-d delim] [file ...]";
  return error;
};

const checkValidation = function(options, doesFileExists) {
  const error = getErrorMessage(options.path);
  if (options.delimiter.length != 1)
    return { isError: true, errorMsg: error.delimiter };
  if (!options.fields) return { isError: true, errorMsg: error.options };
  if (options.path && !doesFileExists(options.path))
    return { isError: true, errorMsg: error.file };
  return { isError: false, errorMsg: null };
};

const parseOptions = function(args) {
  let options = {};
  options.path = getFilePath(args);
  options.delimiter = args.includes("-d") ? args[args.indexOf("-d") + 1] : "\t";
  options.fields = args.includes("-f")
    ? args[args.indexOf("-f") + 1]
    : undefined;
  return options;
};

const getFormatedFields = function(line, delimiter, range) {
  const allFields = line.split(delimiter);
  if (allFields.length == 1) {
    return line;
  }
  const desiredFields = range.map(number => allFields[number - 1]);
  return desiredFields.filter(field => field).join(delimiter);
};

const parseRange = function(fields) {
  return [+fields];
};

module.exports = {
  formatLines,
  getFormatedFields,
  parseOptions,
  parseRange,
  checkValidation
};
