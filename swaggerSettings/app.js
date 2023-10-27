const express = require("express");
const { swaggerUi, specs } = require("./modules/swagger");

const app = express();

// 프로젝트에서 swagger 작성 방법
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs, { explorer: true })
// );

// 웹에서 swagger 작업 후 파일 읽기
const swaggerDocument = require("./docs/openapi.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, () => {
  console.log("Server On");
});
