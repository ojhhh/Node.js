// bcrypto

const express = require("express");
const path = require("path");
const joinRouter = require("./routers/joinRouter");
const loginRouter = require("./routers/loginRouter");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use("/join", joinRouter);
app.use("/login", loginRouter);

app.listen(8080, () => {
  console.log("Server On use PORT = 8080");
});
