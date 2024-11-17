const Logger = require("smart-logs");

const logger = new Logger();

//set log directory default will be logs
logger.setLogDir("logs"); 

//set log file size, default will unlimited
logger.setSize("30m");

//set log formate type
logger.setFormatType("tab");

module.exports = logger;