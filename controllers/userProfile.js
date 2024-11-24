const UserProfileRepo = require("../repository/userProfileRepo");
const UserRepo = require("../repository/userRepo");
const response = require("../utils/response");
const fs = require('fs');
const path = require('path');

class UserProfileController {
  static async getUserProfile(req, res, next) {
    try {
      const { id } = req.user;

      const foundUser = await UserRepo.findUserByID(id);

      if (!foundUser) {
        throw { name: "InvalidToken" };
      }

      res.status(200).json(
        response(0, "Sukses", {
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
        throw { name: "InvalidToken" };
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

  static async updateUserProfileImage(req, res, next) {
    try {
      const image = req.file;

      const foundUser = await UserRepo.findUserByID(req.user.id);

      const oldImage = foundUser.profile_image;

      if (oldImage) {
        const oldImagePath = path.join(__dirname, '../assets', oldImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const updatedProfile = await UserProfileRepo.updateUserProfileImage(
        image.filename,
        req.user.id
      );

      res.status(200).json(
        response(0, "Update Profile Image berhasil", {
          email: foundUser.email,
          first_name: updatedProfile.first_name,
          last_name: updatedProfile.last_name,
          profile_image: updatedProfile.profile_image,
        })
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserProfileController;
