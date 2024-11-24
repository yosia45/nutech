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
        throw { name: "EmailRequired" };
      }

      if (!emailRegex.test(email)) {
        throw { name: "InvalidEmailFormat" };
      }

      if (!password) {
        throw { name: "PasswordRequired" };
      }

      if (password.length < 8) {
        throw { name: "InvalidPasswordLength" };
      }

      if (!first_name) {
        throw { name: "FirstNameRequired" };
      }

      if (!last_name) {
        throw { name: "LastNameRequired" };
      }

      const newPassword = generateHash(password);

      let createdUser = await UserRepo.createUser({
        email,
        password: newPassword,
      });

      if (createdUser.code === "23505") {
        throw { name: "EmailAlreadyExist" };
      }

      await UserProfileRepo.createUserProfile({
        first_name,
        last_name,
        user_id: createdUser.id,
      });

      await UserMoneyRepo.createUserMoney(createdUser.id);

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
        throw { name: "EmailRequired" };
      }

      if (!emailRegex.test(email)) {
        throw { name: "InvalidEmailFormat" };
      }

      if (!password) {
        throw { name: "PasswordRequired" };
      }

      const foundUser = await UserRepo.findUserByEmail(email);

      if (!foundUser) {
        throw { name: "InvalidPaswordEmail" };
      }

      const isPasswordMatch = verifyHash(password, foundUser.password);

      if (!isPasswordMatch) {
        throw { name: "InvalidPaswordEmail" };
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
