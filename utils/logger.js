const { format, createLogger, transports } = require("winston");

const options = {
  error: {
    level: "error",
    filename: `${__dirname}/../logs/appErrors.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  debug: {
    level: "debug",
    filename: `${__dirname}/../logs/appDebug.log`,
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
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      log =>
        `[${log.timestamp}] Level: ${log.level}, Message: ${log.message}`
    )
  ),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.error),
    new transports.File(options.debug)
  ],
  exitOnError: false
});

process.on("uncaughtException", ex => {
  logger.error(ex.message);

});

process.on("unhandledRejection", ex => {
  logger.error(ex.message);

});

module.exports = logger;
