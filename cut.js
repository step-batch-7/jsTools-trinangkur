const { createReadStream } = require('fs');
const readLine = require('readline');
const { stdout, stderr } = process;
const { getFromTwo } = require('./src/arrayMethods');

const StreamPicker = require('./src/streamPicker');
const { cut } = require('./src/executeCut');

const rl = readLine.createInterface({ input: process.stdin });

rl.pause();
rl.on('line', line => rl.emit('data', line));

const main = function() {
  const display = function(outPut) {
    stdout.write(outPut.message);
    stderr.write(outPut.error);
  };
  const streamPicker = new StreamPicker(createReadStream, rl);
  cut(getFromTwo(process.argv), display, streamPicker);
};

main();
