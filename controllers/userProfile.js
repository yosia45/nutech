const UserProfileRepo = require("../repository/userProfileRepo");
const UserRepo = require("../repository/userRepo");
const response = require("../utils/response");

class UserProfileController {
  static async getUserProfile(req, res, next) {
    try {
      const { id } = req.user;

      const foundUser = await UserRepo.findUserByID(id);

      if (!foundUser) {
        res
          .status(404)
          .json(
            response(108, "Token tidak tidak valid atau kadaluwarsa", null)
          );
      }

      res.status(200).json(
        response(0, Sukses, {
          email: foundUser.email,
          first_name: foundUser.first_name,
          last_name: foundUser.last_name,
          profile_image: foundUser.profile_image,
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async updateUserProfile(req, res, next) {
    try {
      const { first_name, last_name } = req.body;
      const { id } = req.user;

      const foundUser = await UserRepo.findUserByID(id);

      if (!foundUser) {
        res
          .status(404)
          .json(
            response(108, "Token tidak tidak valid atau kadaluwarsa", null)
          );
      }

      await UserProfileRepo.updateUserProfile({ first_name, last_name }, id);

      res.status(200).json(
        response(0, "Update Profile berhasil", {
          email: foundUser.email,
          first_name,
          last_name,
          profile_image: foundUser.profile_image,
        })
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserProfileController
