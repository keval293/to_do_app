
const { StatusCodes } = require("http-status-codes");
const { ErrorMessage } = require("../utils/messages");

const validateRequest = (schema, property) => {
    return (req, res, next) => {
      const { error } = schema.validate(req[property], { abortEarly: false });
      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.VALIDATION_ERROR,
          details: error.details.map((detail) => detail.message),
        });
      }
      next();
    };
};

module.exports = validateRequest;
  