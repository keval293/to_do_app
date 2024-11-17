const logger = require("../utils/logger.js");
const errorModuleLog = logger.getLogger("error_controller");
const constant = require("./constant.js");
const { ErrorMessage } = require("../utils/messages");

const handleCastError = (error) => {
  errorModuleLog.error(error);
  const message = `Invalid ${error.path}: ${error.value}`;
  throw new Error(message,constant.errorType.castError);
};

const handleValidationError = (error) => {
  errorModuleLog.error(error);
  const message = Object.values(error.errors).map((el) => el.message);
  throw new Error(
    `Invalid input: ${message.join(", ")}`,
    constant.errorType.validationError
  );
};

const handleDuplicateFieldsDB = (error) => {
  errorModuleLog.error(error);
  const value = error.errmsg.match(constant.Regex.duplicateData)[0];
  const message = ErrorMessage.DUPLICATE_VALUE.replace("_VALUE_", value);
  throw new Error(message);
};

const handleJWTError = () =>
  new Error(ErrorMessage.INVALID_TOKEN,"INVALID_TOKEN");  

const handleJWTExpiredError = () =>
  new Error(ErrorMessage.LOGIN_TOKEN_EXPIRED,"INVALID_TOKEN")  
  
const errorHandler = (err) => {
  errorModuleLog.error(err);
  if (err.name === constant.errorType.castError) handleCastError(err);
  if (err.name === constant.errorType.validationError) handleValidationError(err);
  if (err.code === 11000) handleDuplicateFieldsDB(err);
  if (err.name === constant.errorType.jsonWebTokenError) err = handleJWTError();
  if (err.name === constant.errorType.tokenExpiredError) err = handleJWTExpiredError();

  throw err;
};

module.exports = errorHandler;