const { readPayloadFromToken } = require("../utils/jwt");
const UserRepo = require("../repository/userRepo");
const response = require("../utils/response");

const authn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const payload = readPayloadFromToken(token);
    const user = await UserRepo.findUserByID(payload.id);
    if (!user) {
      res.status(401).json(response(108, "Token tidak tidak valid atau kadaluwarsa", null));
    }
    req.user = {
      id: user.id,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authn