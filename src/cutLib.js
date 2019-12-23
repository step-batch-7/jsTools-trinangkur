const formatFields = function(list) {
  return list.join("\n");
};

const getLines = function(chunk) {
  return chunk.split("\n");
};

module.exports = { formatFields, getLines };
