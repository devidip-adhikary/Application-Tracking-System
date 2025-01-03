require('dotenv').config();
const jwt = require('jsonwebtoken');

// Generate a JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    String(process.env.SECRET_KEY),
    { expiresIn: '1h' }
  );
};

// Verify a JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, verifyToken };