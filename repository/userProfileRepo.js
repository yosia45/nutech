const client = require("../config/dbConnection");

class UserProfileRepo {
  static async createUserProfile(userProfile) {
    try {
      let query = `INSERT INTO user_profiles (first_name, last_name, user_id) VALUES ($1, $2, $3)`;

      const result = await client.query(query, [
        userProfile.first_name,
        userProfile.last_name,
        userProfile.user_id,
      ]);
      return result;
    } catch (err) {
      return err;
    }
  }

  static async updateUserProfile(userProfile, id) {
    try {
      let query = `UPDATE user_profiles SET first_name = $1, last_name = $2 WHERE user_id = $3 RETURNING *`;

      const result = await client.query(query, [
        userProfile.first_name,
        userProfile.last_name,
        id,
      ]);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  }

  static async updateUserProfileImage(fileName, id) {
    try {
      let query = `UPDATE user_profiles SET profile_image = $1 WHERE user_id = $2 RETURNING *`;

      const result = await client.query(query, [fileName, id]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserProfileRepo;
