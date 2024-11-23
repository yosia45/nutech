const client = require("../config/dbConnection");

class UserTransactionRepo {
  static async findAllUserTransactions(id, limit) {
    try {
      let query = `SELECT ut.invoice_name, ut.amount, ut.created_at, s.is_deduct, s.description FROM user_transactions ut
                LEFT JOIN services s ON ut.service_id = s.id
                LEFT JOIN users u ON ut.user_id = u.id
                WHERE ut.user_id = ? 
                ORDER BY ut.created_at DESC
                `;

      if (limit) {
        query += `LIMIT ${limit} `;
      }

      client.query(query, [id], (err, result) => {
        if (err) {
          return err;
        }
        return result.rows;
      });
    } catch (error) {
      return error;
    }
  }

  static async createUserTransaction(userID, service_id, invoice_name, amount) {
    try {
      let query = `INSERT INTO user_transactions (user_id, service_id, invoice_name, amount) VALUES (?, ?, ?, ?)`;

      client.query(
        query,
        [userID, service_id, invoice_name, amount],
        (err, result) => {
          if (err) {
            return err;
          }
          return result.rows;
        }
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserTransactionRepo;
