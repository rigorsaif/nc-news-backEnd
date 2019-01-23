const { format, createLogger, transports } = require("winston");

const options = {
  file: {
    level: "info",
    filename: `${__dirname}/../logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = createLogger({
  transports: [
    new transports.Console(options.console),
    new transports.File(options.file)
  ],
  exitOnError: false
});


module.exports = logger