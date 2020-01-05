const getLastElement = function(list) {
  // eslint-disable-next-line no-magic-numbers
  return list[list.length - 1];
};

const getFirstElement = function(list) {
  // eslint-disable-next-line no-magic-numbers
  return list[0];
};

const getFromTwo = function(list) {
  // eslint-disable-next-line no-magic-numbers
  return list.slice(2);
};

module.exports = { getLastElement, getFirstElement, getFromTwo };
