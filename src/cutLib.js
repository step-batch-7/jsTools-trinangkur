const formatLines = function(list) {
  return list.join("\n");
};

const getLines = function(chunk) {
  return chunk.split("\n");
};

const getFormatedFields = function(line, delimeter, range) {
  const allFields = line.split(delimeter);
  const desiredFields = range.map(element => allFields[element - 1]);
  return desiredFields.filter(element => element).join(delimeter);
};

module.exports = { formatLines, getLines, getFormatedFields };
