const {createLogger} = require("winston");
const CloudWatchTransport = require("winston-aws-cloudwatch");
const {
  logLevel,
  streamName,
  accessKeyID,
  secretAccessKey,
  groupName,
  region
} =
  process.env.NODE_ENV === "production"
    ? process.env
    : require("../config/cloudWatchConfig");

const logger = createLogger({
  transports: [
    new CloudWatchTransport(
      {
        level: logLevel,
        logGroupName: groupName, 
        logStreamName: streamName, 
        createLogGroup: false,
        createLogStream: true,
        submissionInterval: 2000,
        submissionRetryCount: 1,
        batchSize: 20,
        awsConfig: {
          accessKeyId: accessKeyID,
          secretAccessKey: secretAccessKey,
          region: region
        },
        formatLog: item =>
          `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
      },
      err => console.log(err)
    )
  ]
});

process.on("uncaughtException", ex => {
  logger.error(ex.message);
});

process.on("unhandledRejection", ex => {
  logger.error(ex.message);
});

module.exports = logger;
