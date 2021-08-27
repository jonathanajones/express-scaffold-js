const winston = require('winston');

const { format, transports } = winston;
const path = require('path');

const logFormat = format.printf((info) => {
  try {
    return `${info.timestamp} [${info.level}] [${info.label}]: ${JSON.stringify(info.message)}`;
  } catch (e) {
    return `${info.timestamp} [${info.level}] [${info.label}]: ${info.message}`;
  }
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat,
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
