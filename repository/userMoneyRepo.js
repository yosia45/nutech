const client = require("../config/dbConnection");

class UserMoneyRepo {
  static async findUserMoneyByUserID(userID) {
    try {
      let query = `SELECT * FROM user_money WHERE user_id = ?`;

      client.query(query, [userID], (err, result) => {
        if (err) {
          return err;
        }
        return result.rows[0];
      });
    } catch (error) {
      return error;
    }
  }

  static async createUserMoney(userID) {
    try {
      let query = `INSERT INTO user_money (user_id, balance) VALUES (?, 0)`;

      client.query(query, [userID], (err, result) => {
        if (err) {
          return err;
        }
        return result;
      });
    } catch (error) {
      return error;
    }
  }

  static async updateUserMoney(userBalance, userID) {
    try {
      let query = `UPDATE user_money SET balance = ? WHERE user_id = ?`;

      client.query(query, [userBalance, userID], (err, result) => {
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

module.exports = UserMoneyRepo;
