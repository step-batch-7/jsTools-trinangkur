const { createReadStream } = require("fs");
const readLine = require("readline");
const { cut } = require("./src/cutEstablisher");

const rl = readLine.createInterface({ input: process.stdin });

rl.pause();
rl.on("line", line => rl.emit("data", line));

const main = function() {
  const display = function(outPut) {
    outPut.message != undefined && console.log(outPut.message);
    outPut.err != undefined && console.error(outPut.err);
  };
  cut(process.argv.slice(2), display, createReadStream, rl);
};

main();
