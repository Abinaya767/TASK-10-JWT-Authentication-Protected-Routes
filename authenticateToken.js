const { verifyToken } = require("../utils/jwt");

function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Send a valid token using Authorization: Bearer <token>.",
    });
  }

  const token = authorization.slice(7).trim();
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token is missing." });
  }

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      department: payload.department,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message === "Token expired" ? "Authentication token has expired. Please log in again." : "Invalid authentication token.",
    });
  }
}

module.exports = authenticateToken;
