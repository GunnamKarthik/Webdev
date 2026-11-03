const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header('Authorization');

  // Check if token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access denied. No token provided.'
    });
  }

  // Extract token from "Bearer TOKEN"
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store logged-in user's ID in the request
    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = authMiddleware;