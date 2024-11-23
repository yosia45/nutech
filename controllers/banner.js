const { response } = require("express")
const BannerRepo = require("../repository/bannerRepo")

class BannerController {
    static async getBanner(req, res, next) {
        try {
            const banners = await BannerRepo.getBanner()

            res.status(200).json(response(0, "Sukses", banners))
        } catch (err) {
            next(err)
        }
    }
}

module.exports = BannerController