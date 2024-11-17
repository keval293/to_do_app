/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const errorHandler = require("../utils/error.js");
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
const logger = require("./logger.js");
const jwtModuleLog = logger.getLogger("jwt");

const signJwt = ({ id, permission }) => {
  try {
    return jwt.sign({ id, permission }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  } catch (error) {
    jwtModuleLog.error(error);
    errorHandler(error);
  }
};

const verifyJwt = async (token) => {
  try {
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    jwtModuleLog.error(error);
    errorHandler(error);
  }
};

const signToken = async(userId) => {
  // Create access token
  return signJwt({ id: userId });
};

module.exports = {
  signJwt,
  verifyJwt,
  signToken,
};
