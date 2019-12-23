const reader = require("fs").readFile;
const { executeCmnd } = require("./src/executeCmnd");

const main = function() {
  const ioTool = {
    reader,
    log: console.log,
    errStream: console.error,
    stdin: process.stdin
  };
  executeCmnd(process.argv.slice(2), ioTool);
};

main();
