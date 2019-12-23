const read = require("fs").readFile;
const { executeCmnd } = require("./src/executeCmnd");

const main = function() {
  const ioTool = {
    read,
    log: console.log,
    errStream: console.error,
    stdin: process.stdin
  };
  executeCmnd(process.argv.slice(2), ioTool);
};

main();
