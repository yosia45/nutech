const ServiceRepo = require("../repository/serviceRepo");

class ServiceController {
  static async getAllServices(req, res, next) {
    try {
      const services = await ServiceRepo.findAllServices();
      res.status(200).json(response(0, "Sukses", services));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ServiceController;
