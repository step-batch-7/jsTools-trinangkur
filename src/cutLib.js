const formatLines = function(list) {
  return list.join("\n");
};

const getFilePath = function(args) {
  if (args.length % 2 == 0) return;
  return args[args.length - 1];
};

const parseOptions = function(args) {
  let commands = { options: {} };
  commands.options.path = getFilePath(args);
  commands.options.delimeter = args[args.indexOf("-d") + 1];
  commands.options.fields = args[args.indexOf("-f") + 1];
  return commands;
};

const getLines = function(chunk) {
  return chunk.split("\n");
};

const getFormatedFields = function(line, delimeter, range) {
  const allFields = line.split(delimeter);
  const desiredFields = range.map(element => allFields[element - 1]);
  return desiredFields.filter(element => element).join(delimeter);
};

module.exports = { formatLines, getLines, getFormatedFields, parseOptions };
