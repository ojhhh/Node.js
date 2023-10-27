const express = require("express");
const { swaggerUi, specs } = require("./swagger");
const usersRouter = require("./routers/usersRouter");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/user", usersRouter);

app.listen(8080, () => {
  console.log("Server On");
});
