const UserMoneyRepo = require("../repository/userMoneyRepo");
const response = require("../utils/response");

class UserMoneyController {
  static async getUserMoney(req, res, next) {
    try {
      const { id } = req.user;
      const money = await UserMoneyRepo.findUserMoneyByUserID(id);

      res
        .status(200)
        .json(
          response(200, "Berhasil mendapatkan data user money", {
            balance: money.balance,
          })
        );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserMoneyController;
