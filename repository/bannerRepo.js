const client = require("../config/dbConnection");

class BannerRepo {
  static async getBanner() {
    try {
      let query = `SELECT b.name, b.image, b.description FROM banners b`;

      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      return err;
    }
  }
}

module.exports = BannerRepo;
