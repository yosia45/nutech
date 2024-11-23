const express = require('express');
// import routes from './routes';

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(routes);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
