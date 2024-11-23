const { readPayloadFromToken } = require("../helpers/jwt");
const UserRepo = require("../repository/userRepo");

const authn = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readPayloadFromToken(access_token);
    const user = await UserRepo.findUserByEmail(payload.email);
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