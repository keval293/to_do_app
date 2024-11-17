/* eslint-disable no-undef */
const errorHandler = require("../utils/error.js");
const user = require("../models/user.model.js");
const { verifyJwt } = require("../utils/jwt.js");
const logger = require("../utils/logger.js");
const authUserMiddlewareLog = logger.getLogger("auth_user_middleware");
const { errorResponse } = require("../utils/response.js");

const authUser = async (req,res,next) => {
  try {
    // Get the access token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token) return false;

    // Validate the Access token
    const decoded = await verifyJwt(token);

    if (!decoded) return false;

    // Check if user exist
    const currentUser = await user.findById(decoded.id);

    if (!currentUser) return errorResponse("1014");

    req.user = currentUser;
    next();
  } catch (error) {
    authUserMiddlewareLog.error(error);
    errorHandler(error);
  }
};

module.exports = authUser;
