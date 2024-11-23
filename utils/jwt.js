const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const generateTokenFromPayload = (payload) => {
  return jwt.sign(payload, secretKey);
};

const readPayloadFromToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateTokenFromPayload,
  readPayloadFromToken,
};