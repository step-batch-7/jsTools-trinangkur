class Parser {
  constructor(lookupOptions) {
    this.options = lookupOptions;
  }
  parse(userArgs) {
    const parsedOptions = { delimiter: '\t' };
    for (let index = 0; index < userArgs.length; index++) {
      if (userArgs[index].startsWith('-')) {
        const optionName = this.options[userArgs[index]];
        parsedOptions[optionName] = userArgs[++index];
      } else {
        parsedOptions.path = userArgs[index];
      }
    }
    return parsedOptions;
  }
}

module.exports = { Parser };
