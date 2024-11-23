const client = require("../config/dbConnection");

class UserRepo {
  static async findUserByEmail(email) {
    try {
      let query = `SELECT * FROM users WHERE email = ?`;

      client.query(query, [email], (err, result) => {
        if (err) {
          return err;
        }
        return result.rows[0];
      });
    } catch (error) {
      return error;
    }
  }

  static async findUserByID(id) {
    try {
      let query = `
        SELECT u.email, up.first_name, up.last_name, up.profile_image FROM users u
        LEFT JOIN user_profiles up ON u.id = up.user_id
        WHERE u.id = ?`;

      client.query(query, [id], (err, result) => {
        if (err) {
          return err;
        }
        return result.rows[0];
      });
    } catch (error) {
      return error;
    }
  }

  static async createUser(user) {
    try {
      let query = `INSERT INTO users (email, password) VALUES (?, ?)`;
      client.query(query, [user.email, user.password], (err, result) => {
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

module.exports = UserRepo;
