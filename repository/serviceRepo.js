const client = require("../config/dbConnection");

class ServiceRepo {
  static async findAllServices() {
    try {
      let query = `SELECT s.id, s.code, s.name, s.icon, s.price FROM services s WHERE s.is_deduct = true`;

      client.query(query, (err, result) => {
        if (err) {
          return err;
        }
        return result.rows;
      });
    } catch (error) {
      return error;
    }
  }

  static async findServiceByCode(code) {
    try {
      let query = `SELECT s.code, s.name, s.icon, s.price FROM services s WHERE s.code = ?`;

      client.query(query, [code], (err, result) => {
        if (err) {
          return err;
        }
        return result.rows;
      });
    } catch (error) {
      return error;
    }
  }
}

module.exports = ServiceRepo;
