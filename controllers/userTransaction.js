const ServiceRepo = require("../repository/serviceRepo");
const UserMoneyRepo = require("../repository/userMoneyRepo");
const UserTransactionRepo = require("../repository/userTransactionRepo");
const invoiceNameGenerator = require("../utils/invoiceName");
const response = require("../utils/response");

class UserTransactionController {
  static async getAllTransaction(req, res, next) {
    try {
      const { limit } = req.query;

      const transactions = await UserTransactionRepo.findAllUserTransactions(
        req.user.id,
        limit
      );

      res.status(200).json(response(0, "Get History Berhasil", transactions));
    } catch (err) {
      next(err);
    }
  }

  static async topUp(req, res, next) {
    try {
      const { top_up_amount } = req.body;
      const { id } = req.user;

      if (!top_up_amount) {
        res
          .status(400)
          .json(response(108, "Parameter top_up_amount harus di isi", null));
      }

      if (top_up_amount < 0) {
        res
          .status(400)
          .json(
            response(
              102,
              "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
              null
            )
          );
      }

      const foundUser = await UserMoneyRepo.findUserMoneyByUserID(id);

      if (!foundUser) {
        res.status(404).json(response(108, "User tidak ditemukan", null));
      }

      const foundService = await ServiceRepo.findServiceByCode("TOPUP");

      const newBalance = foundUser.balance + top_up_amount;

      await UserMoneyRepo.updateUserMoney(newBalance, id);

      await UserTransactionRepo.createUserTransaction(
        id,
        foundService.id,
        invoiceNameGenerator(foundService.code, id),
        top_up_amount
      );

      res
        .status(200)
        .json(response(0, "Top Up Balance berhasil", { balance: newBalance }));
    } catch (err) {
      next(err);
    }
  }

  static async buyService(req, res, next) {
    try {
      const { service_code } = req.body;
      const { id } = req.user;

      if (!service_code) {
        res
          .status(400)
          .json(response(108, "Parameter service_code harus di isi", null));
      }

      const foundService = await ServiceRepo.findServiceByCode(service_code);

      if (!foundService) {
        res.status(404).json(response(108, "Service tidak ditemukan", null));
      }

      const foundUserMoney = await UserMoneyRepo.findUserMoneyByUserID(id);

      if (foundUserMoney.balance < foundService.price) {
        res
          .status(200)
          .json(
            response(
              200,
              `Balance tidak mencukupi untuk membeli service ${foundService.name}`,
              null
            )
          );
      }

      const newBalance = foundUserMoney.balance - foundService.price;

      await UserMoneyRepo.updateUserMoney(newBalance, id);

      await UserTransactionRepo.createUserTransaction(
        id,
        foundService.id,
        invoiceNameGenerator(foundService.code, id),
        foundService.price
      );

      res
        .status(200)
        .json(
          response(0, "Transaksi berhasil", { 
            invoice_number: invoiceNameGenerator(foundService.code, id),
            service_code: foundService.code,
            service_name: foundService.name,
            transaction_type: "PAYMENT",
            total_amount: foundService.price,
           })
        );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserTransactionController;