import TokenManager from "../security/token-manager.js";
import AuthenticationError from "../exceptions/authentication-error.js";

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token || token.indexOf("Bearer ") === -1) {
    return next(new AuthenticationError("Missing or invalid authorization header"));
  }
  
  try {
    const user = await TokenManager.verifyAccessToken(
      token.split("Bearer ")[1],
      // eslint-disable-next-line no-undef
      process.env.ACCESS_TOKEN_KEY,
    );
    req.user = user;
    return next();
  } catch (error) {
    return next(new AuthenticationError(error.message));
  }
}

export default authenticateToken;