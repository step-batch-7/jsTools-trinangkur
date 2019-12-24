const fs = require("fs");
const readLine = require("readline");
const { manageCut } = require("./src/manageCut");

const rl = readLine.createInterface({ input: process.stdin });
rl.pause();

const main = function() {
  const display = function(outPut) {
    outPut.message != undefined && console.log(outPut.message);
    outPut.err != undefined && console.error(outPut.err);
  };
  manageCut(process.argv.slice(2), fs, display, rl);
};

main();
