const ServiceRepo = require("../repository/serviceRepo");
const response = require("../utils/response");

class ServiceController {
  static async getAllServices(req, res, next) {
    try {
      const services = await ServiceRepo.findAllServices();
      const result = services.map((service) => {
        return {
          service_code: service.code,
          service_name: service.name,
          service_icon: service.icon,
          service_tariff: service.price,
        };
      });
      res.status(200).json(response(0, "Sukses", result));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ServiceController;
