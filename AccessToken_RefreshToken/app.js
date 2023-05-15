const express = require("express");
const session = require("express-session");
const path = require("path");
const dot = require("dotenv").config();
const mysql2 = require("mysql2");
const jwt = require("jsonwebtoken");
const joinRouter = require("./routers/joinRouter");
const loginRouter = require("./routers/loginRouter");
const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/join", joinRouter);
app.use("/login", loginRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server On UsePORT : ${process.env.PORT}`);
});
