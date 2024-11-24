const response = require("../utils/response");
const BannerRepo = require("../repository/bannerRepo");

class BannerController {
  static async getBanner(req, res, next) {
    try {
      const banners = await BannerRepo.getBanner();

      if (banners.message) {
        res.status(500).json(response(1, banners.message, null));
      }

      res.status(200).json(response(0, "Sukses", banners));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BannerController;
