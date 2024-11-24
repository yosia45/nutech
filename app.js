if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const routes = require("./routes/index");

require("./config/dbConnection");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
// app.use("/profile/images", express.static("/uploads"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
