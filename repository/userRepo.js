const client = require("../config/dbConnection");

class UserRepo {
  static async findUserByEmail(email) {
    try {
      let query = `SELECT * FROM users WHERE email = $1`;

      const result = await client.query(query, [email]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  static async findUserByID(id) {
    try {
      let query = `
        SELECT u.id, u.email, up.first_name, up.last_name, up.profile_image FROM users u
        LEFT JOIN user_profiles up ON u.id = up.user_id
        WHERE u.id = $1`;

      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  static async createUser(user) {
    try {
      let query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
      const result = await client.query(query, [user.email, user.password]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserRepo;
