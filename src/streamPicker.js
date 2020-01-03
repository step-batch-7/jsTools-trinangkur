class StreamPicker {
  constructor(createStream, rl) {
    this.createStream = createStream;
    this.rl = rl;
  }
  pick(filePath) {
    return filePath ? this.createStream(filePath) : this.rl;
  }
}
module.exports = StreamPicker;
