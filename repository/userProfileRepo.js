const client = require("../config/dbConnection");

class UserProfileRepo {
  static async createUserProfile(userProfile) {
    try {
      let query = `INSERT INTO user_profiles (first_name, last_name, user_id) VALUES (?, ?, ?)`;

      client.query(
        query,
        [userProfile.first_name, userProfile.last_name, userProfile.user_id],
        (err, result) => {
          if (err) {
            return err;
          }
          return result;
        }
      );
    } catch (error) {
      return error;
    }
  }

  static async updateUserProfile(userProfile, id) {
    try {
      let query = `UPDATE user_profiles SET first_name = ?, last_name = ? WHERE id = ?`;

      client.query(
        query,
        [userProfile.first_name, userProfile.last_name, id],
        (err, result) => {
          if (err) {
            return err;
          }
          return result;
        }
      );
    } catch (error) {
      return error;
    }
  }

  static async updateUserProfileImage(userProfile, id) {
    try {
      let query = `UPDATE user_profiles SET profile_image = ? WHERE id = ?`;

      client.query(query, [userProfile.profile_image, id], (err, result) => {
        if (err) {
          return err;
        }
        return result;
      });
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserProfileRepo;
