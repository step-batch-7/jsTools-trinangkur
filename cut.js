const fs = require("fs");
const { manageCut } = require("./src/manageCut");

const main = function() {
  const display = function(outPut) {
    outPut.message && console.log(outPut.message);
    outPut.err && console.error(outPut.error);
  };
  manageCut(process.argv.slice(2), fs, display, process.stdin);
};

main();
