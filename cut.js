const { readFile, existsSync } = require("fs");
const { manageCut } = require("./src/manageCut");

const main = function() {
  const display = {
    log: console.log,
    error: console.error
  };
  const fsTool = {
    read: readFile,
    exists: existsSync
  };
  manageCut(process.argv.slice(2), fsTool, display, process.stdin);
};

main();
