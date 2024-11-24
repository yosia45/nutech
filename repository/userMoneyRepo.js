const client = require("../config/dbConnection");

class UserMoneyRepo {
  static async findUserMoneyByUserID(userID) {
    try {
      let query = `SELECT * FROM user_money WHERE user_id = $1`;

      const result = await client.query(query, [userID]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  static async createUserMoney(userID) {
    try {
      let query = `INSERT INTO user_money (user_id, balance) VALUES ($1, 0)`;

      const result = await client.query(query, [userID]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  static async updateUserMoney(userBalance, userID) {
    try {
      let query = `UPDATE user_money SET balance = $1 WHERE user_id = $2 RETURNING balance`;

      const result = await client.query(query, [userBalance, userID]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserMoneyRepo;
