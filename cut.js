const fs = require("fs");
const { manageCut } = require("./src/manageCut");

const main = function() {
  const display = {
    log: console.log,
    error: console.error
  };
  manageCut(process.argv.slice(2), fs, display, process.stdin);
};

main();
