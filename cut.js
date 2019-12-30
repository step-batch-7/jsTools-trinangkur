const { createReadStream } = require('fs');
const readLine = require('readline');
const { stdout, stderr } = process;

const { cut } = require('./src/cutEstablisher');

const rl = readLine.createInterface({ input: process.stdin });

rl.pause();
rl.on('line', line => rl.emit('data', line));

const main = function() {
  const display = function(outPut) {
    outPut.message !== undefined && stdout.write(outPut.message);
    outPut.err !== undefined && stderr.write(outPut.err);
  };
  const usrArgsStartIndex = 2;
  cut(process.argv.slice(usrArgsStartIndex), display, createReadStream, rl);
};

main();
