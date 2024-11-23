const client = require("../config/dbConnection");

class BannerRepo {
  static async getBanner() {
    try {
      let query = `SELECT b.name, b.image, b.description FROM banners b`;

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
}

module.exports = BannerRepo;
