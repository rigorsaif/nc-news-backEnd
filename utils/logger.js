const { format, createLogger, transports } = require("winston");
const {
  AccessKeyID,
  SecretAccessKey,
  username
} = require("../config/cloudWatchConfig");
const CloudWatchTransport = require("winston-aws-cloudwatch");

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

const level =
  process.env.NODE_ENV === "production" ? options.level : options.debug;

const logger = createLogger({
  transports: [
    new CloudWatchTransport(
      {
        level: "debug",
        logGroupName: "minia-news-logs", // REQUIRED
        logStreamName: "ERR", // REQUIRED
        createLogGroup: false,
        createLogStream: true,
        submissionInterval: 2000,
        submissionRetryCount: 1,
        batchSize: 20,
        awsConfig: {
          accessKeyId: AccessKeyID,
          secretAccessKey: SecretAccessKey,
          region: "eu-west-2"
        },
        formatLog: item =>
          `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
      },
      err => console.log(err)
    )
  ]
});

//logger.add(new transports.File(level));

process.on("uncaughtException", ex => {
  logger.error(ex.message);
});

process.on("unhandledRejection", ex => {
  logger.error(ex.message);
});

logger.stream = {
  write: function(message, encoding) {
    logger.debug(message);
  }
};

module.exports = logger;
