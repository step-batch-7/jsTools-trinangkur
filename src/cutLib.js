const formatFields = function(list) {
  return list.join("\n");
};

const getLines = function(chunk) {
  return chunk.split("\n");
};

const getFileds = function(line, delimeter, range) {
  const allFields = line.split(delimeter);
  const desiredFields = range.map(element => {
    return allFields[element - 1];
  });
  return desiredFields;
};

module.exports = { formatFields, getLines, getFileds };
