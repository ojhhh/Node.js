const express = require("express");
const dot = require("dotenv").config();
const { sequelize } = require("./models");

const app = express();

app.use(express.urlencoded({ extended: false }));

sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("connect success");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(8080, () => {
  console.log("Server On");
});
