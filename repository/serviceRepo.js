const client = require("../config/dbConnection");

class ServiceRepo {
  static async findAllServices() {
    try {
      let query = `SELECT s.id, s.code, s.name, s.icon, s.price FROM services s WHERE s.is_deduct = true`;

      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      return err;
    }
  }

  static async findServiceByCode(code) {
    try {
      let query = `SELECT s.id, s.code, s.name, s.icon, s.price FROM services s WHERE s.code = $1`;

      const result = await client.query(query, [code]);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }
}

module.exports = ServiceRepo;
