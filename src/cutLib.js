const formatLines = function(list) {
  return list.join("\n");
};

const getFilePath = function(args) {
  if (args.length % 2 == 0) return;
  return args[args.length - 1];
};

// const checkValidation = function(cmndArgs, options) {};

const parseOptions = function(args) {
  let options = {};
  options.path = getFilePath(args);
  options.delimeter =
    (args.find(e => e == "-d") && args[args.indexOf("-d") + 1]) || "\t";
  options.fields = args[args.indexOf("-f") + 1];
  return options;
};

const getLines = function(chunk) {
  return chunk.split("\n");
};

const getFormatedFields = function(line, delimeter, range) {
  const allFields = line.split(delimeter);
  if (allFields.length == 1) {
    return line;
  }
  const desiredFields = range.map(element => allFields[element - 1]);
  return desiredFields.filter(element => element).join(delimeter);
};

const parseRange = function(fields) {
  return [+fields];
};

module.exports = {
  formatLines,
  getLines,
  getFormatedFields,
  parseOptions,
  parseRange
  //checkValidation
};
