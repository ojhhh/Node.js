# swagger

- 백엔드 개발자들이 개발을 하면 프론트엔드 개발자에게 문서화된 개발 결과를 제공하여 협업할 수 있게 도와주는 API
- 개발을 하며 생길 수 있는 휴먼에러를 최소화

### swagger를 express에 연동

- npm install --save swagger-ui-express

### swagger 설정을 쉽게 생성 할 수 있게 도와주는 모듈

- npm install --save swagger-jsdoc

## 닉네임 조회 관련 swagger 실습

### @swagger.js 모듈 설정

- title : swagger 설정 제목
- version : swagger 버전
- description : swagger 설정 관련 간단한 설명
- host : swagger 접근 주소 및 포트 번호
- apic 라우터 파일의 경로
<!-- 
const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
swaggerDefinition: {
info: {
title: "Test API",
version: "1.0.0",
description: "Test API with express",
},
host: "localhost:8080",
basePath: "/",
},
apis: ["./routers/*.js"],
};

const specs = swaggereJsdoc(options);

module.exports = {
swaggerUi,
specs,
};
-->

### @app.js 설정

- app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); -> swagger.js에서 설정한 host 주소 뒤에 /api-docs를 붙히면 router에 설정한 정보를 gui로 볼 수 있음
<!-- 
  const express = require("express");
  const { swaggerUi, specs } = require("./swagger");
  const usersRouter = require("./routers/usersRouter");
  const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(saggerRouter);
app.use("/user", usersRouter);

app.listen(8080, () => {
console.log("Server On");
});
-->

### @routers/usersRouter.js 설정

<!--
const router = require("express").Router();
const users = [
  { id: "test1", pw: "test1", nickname: "test1" },
  { id: "test2", pw: "test2", nickname: "test2" },
  { id: "test3", pw: "test3", nickname: "test3" },
  { id: "test4", pw: "test4", nickname: "test4" },
  { id: "test5", pw: "test5", nickname: "test5" },
];
/**

* @swagger
* paths:
* /user/nickname:
* post:
* tags:
* - user
* description: 닉네임 조회
* parameters:
* - in: body
*      name: body
*      required: true
*      schema:
*       properties:
*        id:
*         type: string
*        pw:
*         type: string
*
* responses:
*     200:
*      description: 닉네임 조회 성공
*      schema:
*       properties:
*        message:
*         type: string
*     401:
*      description: 닉네임 조회 실패
*      schema:
*       properties:
*        message:
*         type: string
* \*/

// 닉네임 조회에 대한 swagger
router.post("/nickname", async (req, res, next) => {
try {
for (var i = 0; i < users.length; i++) {
if (req.body.id == users[i].id) {
if (req.body.pw == users[i].pw) {
return res.status(200).json({
message: "닉네임 : " + users[i].nickname,
});
} else {
return res.status(401).json({
message: "비밀번호가 틀렸습니다!",
});
}
}
}
return res.status(401).json({
messge: "아이디가 존재하지 않습니다!",
});
} catch (err) {
console.log(err);
return next(err);
}
});

module.exports = router;
-->
