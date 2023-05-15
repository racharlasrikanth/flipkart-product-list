// const { isTokenValid, attachCookiesToResponse } = require("../utils");
const CustomError = require("./../errors");
// const Token = require("./../models/Token");
// const { createJWT, isTokenValid } = require("./../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const { currentuser, authenticationtoken } = req.headers;

  if (!currentuser || !authenticationtoken) {
    throw new CustomError.BadRequestError(
      "currentuser or authenticationtoken headers are missing"
    );
  }

  try {
    if (authenticationtoken) {
      const payload = isTokenValid(authenticationtoken);
      req.user = payload;
      req.user.userId = currentuser;
      return next();
    }
  } catch (error) {
    throw new CustomError.UnAuthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...allRoles) => {
  return (req, res, next) => {
    if (!allRoles.includes(req.user.role)) {
      throw new CustomError.UnAuthorizedError(
        "Unauthorized access to this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
