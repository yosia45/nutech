const UserMoneyRepo = require("../repository/userMoneyRepo");
const UserProfileRepo = require("../repository/userProfileRepo");
const UserRepo = require("../repository/userRepo");
const { generateHash, verifyHash } = require("../utils/bcrypt");
const { generateTokenFromPayload } = require("../utils/jwt");
const response = require("../utils/response");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, first_name, last_name, password } = req.body;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        res
          .status(400)
          .json(response(102, "Parameter email harus di isi", null));
      }

      if (!emailRegex.test(email)) {
        res
          .status(400)
          .json(response(102, "Paramter email tidak sesuai format", null));
      }

      if (!password) {
        res
          .status(400)
          .json(response(102, "Parameter password harus di isi", null));
      }

      if (password.length < 8) {
        res
          .status(400)
          .json(response(102, "Password length minimal 8 karakter", null));
      }

      if (!first_name) {
        res
          .status(400)
          .json(response(102, "Parameter first_name harus di isi", null));
      }

      if (!last_name) {
        res
          .status(400)
          .json(response(102, "Parameter last_name harus di isi", null));
      }

      const newPassword = generateHash(password);

      let createdUser = await UserRepo.createUser({ email, newPassword });

      await UserProfileRepo.createUserProfile({
        first_name,
        last_name,
        createdUser,
      });

      await UserMoneyRepo.createUserMoney(createdUser);

      res
        .status(201)
        .json(response(0, "Registrasi berhasil silahkan login", null));
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        res
          .status(400)
          .json(response(102, "Parameter email harus di isi", null));
      }

      if (!emailRegex.test(email)) {
        res
          .status(400)
          .json(response(102, "Paramter email tidak sesuai format", null));
      }

      if (!password) {
        res
          .status(400)
          .json(response(102, "Parameter password harus di isi", null));
      }

      const foundUser = await UserRepo.findUserByEmail(email);

      if (!foundUser) {
        res
          .status(404)
          .json(response(103, "Username atau password salah", null));
      }

      const isPasswordMatch = verifyHash(password, foundUser.password);

      if (!isPasswordMatch) {
        res
          .status(404)
          .json(response(103, "Username atau password salah", null));
      }

      const payload = {
        id: foundUser.id,
      };

      const token = generateTokenFromPayload(payload);

      res.status(200).json(response(0, "Login sukses", { token }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
