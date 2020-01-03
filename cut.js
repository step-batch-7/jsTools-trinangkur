const { createReadStream } = require('fs');
const readLine = require('readline');
const { stdout, stderr } = process;

const StreamPicker = require('./src/streamPicker');
const { cut } = require('./src/cutEstablisher');

const rl = readLine.createInterface({ input: process.stdin });

rl.pause();
rl.on('line', line => rl.emit('data', line));

const main = function() {
  const display = function(outPut) {
    stdout.write(outPut.message);
    stderr.write(outPut.error);
  };
  const streamPicker = new StreamPicker(createReadStream, rl);
  const usrArgsStartIndex = 2;
  cut(process.argv.slice(usrArgsStartIndex), display, streamPicker);
};

main();
