const { createReadStream } = require('fs');
const readLine = require('readline');
const { cut } = require('./src/cutEstablisher');
const { stdout, stderr } = process;

const rl = readLine.createInterface({ input: process.stdin });

rl.pause();
rl.on('line', line => rl.emit('data', line));

const main = function() {
  const display = function(outPut) {
    outPut.message !== undefined && stdout.write(outPut.message + '\n');
    outPut.err !== undefined && stderr.write(outPut.err + '\n');
  };
  const usrArgsStartIndex = 2;
  cut(process.argv.slice(usrArgsStartIndex), display, createReadStream, rl);
};

main();
