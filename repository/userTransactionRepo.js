const client = require("../config/dbConnection");

class UserTransactionRepo {
  static async findAllUserTransactions(id, limit) {
    try {
      let query = `SELECT ut.invoice_name, ut.amount, ut.created_at, s.is_deduct, s.description FROM user_transactions ut
                LEFT JOIN services s ON ut.service_id = s.id
                LEFT JOIN users u ON ut.user_id = u.id
                WHERE ut.user_id = $1 
                ORDER BY ut.created_at DESC
                `;

      if (limit) {
        query += `LIMIT ${limit} `;
      }

      const result = await client.query(query, [id]);
      return result.rows;
    } catch (err) {
      return err;
    }
  }

  static async createUserTransaction(userID, service_id, invoice_name, amount) {
    try {
      let query = `INSERT INTO user_transactions (user_id, service_id, invoice_name, amount) VALUES ($1, $2, $3, $4)`;

      const result = await client.query(query, [
        userID,
        service_id,
        invoice_name,
        amount,
      ]);

      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = UserTransactionRepo;
