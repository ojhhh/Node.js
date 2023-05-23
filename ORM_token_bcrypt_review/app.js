const express = require("express");
const session = require("express-session");
const path = require("path");
const dot = require("dotenv").config();
const { sequelize } = require("./models");

const mainRouter = require("./routers/mainRouter");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const boardRouter = require("./routers/boardRouter");
const adminRouter = require("./routers/adminRouter");

const app = express();

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("connect");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(mainRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/board", boardRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server On use ${process.env.PORT} port`);
});
