const formatLines = function(list) {
  return list.join("\n");
};

const getLines = function(chunk) {
  return chunk.split("\n");
};

const getFormatedFields = function(line, delimeter, range) {
  const allFields = line.split(delimeter);
  const validRange = range.filter(element => {
    return allFields[element - 1] ? true : false;
  });
  const desiredFields = validRange.map(element => allFields[element - 1]);
  return desiredFields.join(delimeter);
};

module.exports = { formatLines, getLines, getFormatedFields };
