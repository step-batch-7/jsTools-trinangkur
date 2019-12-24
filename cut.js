const { readFile, existsSync } = require("fs");
const { executeCmnd } = require("./src/executeCmnd");

const main = function() {
  const display = {
    log: console.log,
    error: console.error
  };
  const fsTool = {
    read: readFile,
    exists: existsSync
  };
  executeCmnd(process.argv.slice(2), fsTool, display, process.stdin);
};

main();
