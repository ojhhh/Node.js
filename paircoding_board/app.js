const express = require("express");
const path = require("path");
const dot = require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`Server On use port = ${process.env.PORT}`);
});
