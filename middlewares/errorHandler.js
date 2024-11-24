const response = require("../utils/response");

const errorHander = (err, req, res, next) => {
  if (err.name === "EmailRequired") {
    res.status(400).json(response(102, "Parameter email harus di isi", null));
  } else if (err.name === "InvalidEmailFormat") {
    res
      .status(400)
      .json(response(102, "Paramter email tidak sesuai format", null));
  } else if (err.name === "PasswordRequired") {
    res
      .status(400)
      .json(response(102, "Parameter password harus di isi", null));
  } else if (err.name === "InvalidPasswordLength") {
    res
      .status(400)
      .json(response(102, "Password length minimal 8 karakter", null));
  } else if (err.name === "FirstNameRequired") {
    res
      .status(400)
      .json(response(102, "Parameter first_name harus di isi", null));
  } else if (err.name === "LastNameRequired") {
    res
      .status(400)
      .json(response(102, "Parameter last_name harus di isi", null));
  } else if (err.name === "EmailAlreadyExist") {
    res.status(400).json(response(101, "Email sudah terdaftar", null));
  } else if (err.name === "InvalidPaswordEmail") {
    res.status(404).json(response(103, "Username atau password salah", null));
  } else if (err.name === "InvalidToken") {
    res
      .status(404)
      .json(response(108, "Token tidak tidak valid atau kadaluwarsa", null));
  } else if (err.name === "TopUpAmountRequired") {
    res
      .status(400)
      .json(response(102, "Parameter top_up_amount harus di isi", null));
  } else if (err.name === "InvalidTopUpAmount") {
    res
      .status(400)
      .json(
        response(
          102,
          "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
          null
        )
      );
  } else if (err.name === "ServiceCodeRequired") {
    res
      .status(400)
      .json(response(102, "Parameter service_code harus di isi", null));
  }
};

module.exports = errorHander;
