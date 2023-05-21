// 시퀄라이즈 ORM(객체 관계 맵핑) 모듈
// 객체와 데이터베이스를 ORM 라이브러리가 매핑을 시켜 Javascript 구문으로 SQL을 제어

// 설치할 모듈 express ejs sequelize mysql2 dotenv
const express = require("express");
const path = require("path");
const dot = require("dotenv").config();
const { Sequelize, User, Post } = require("./models");
const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

// 시퀄라이즈 구성 연결 매핑
// sync 함수는 데이터 베이스를 동기화 시켜주는 메소드
// focus true : 값이 있으면 때 초기화 false 초기화 안됨
// Sequelize는 promise 기반
Sequelize.sync({ focus: true })
  .then(() => {
    // 연결 성공
    console.log("connect sccess");
  })
  .catch((err) => {
    // 연결 실패
    console.error(err);
  });

app.get("/", (req, res) => {
  res.render("create");
});

// 메인페이지에서 유저 전체 조회
app.get("/main", (req, res) => {
  // findAll 메소드 : 매개변수로 검색 조건을 객체로 추가
  User.findAll({})
    .then((e) => {
      res.render("main", { data: e });
    })
    .catch(() => {
      // 유저 조회 실패
      res.send("유저 조회 실패");
    });
});

// 해당 유저를 조회하고 작성한 글 만 보기
app.get("/view/:name", (req, res) => {
  User.findOne({
    where: {
      // 해당 이름의 유저를 조회
      name: req.params.name,
    },
    // raw 속성 : 관계형으로 불러온 값을 풀어서 볼 수 있음
    //raw: true,

    include: [
      {
        // 조회 할 모듈 post 모델
        model: Post,
      },
    ],
  }).then((e) => {
    // Posts는 post.js에서 테이블만들때 설정한 modelName의 복수형?
    // Posts안에 찾아온 게시글의 내용을 담고 있음
    //  -> 처음에 Posts로 했는데 계속 에러 나길래 e.dataValues에 뭐가 들어 있나 보니 게시글을 담은 객체의 이름이 posts로 첫글자가 소문자였음
    //  -> posts로 바꿧더니 정상작동하길래 찾아보니 modelName이 post로 되어 있어 혹시 싶어 이름을 qwer이런식으로 바꾸고 테이블을 다시 만들고 테스트 해보니 qwers 객체에 게시글이 담겨있었음
    // -> 객체 이름은 modelname에 s가 붙고 modelName 이름 자체 마지막 글자가 s이면 s가 안붙음
    e.dataValues.Posts = e.dataValues.Posts.map((i) => i.dataValues);
    const Posts = e.dataValues;
    // console.log(Posts);
    res.render("view", { data: Posts });
  });
});

app.post("/create_post", (req, res) => {
  const { name, value } = req.body;
  // console.log(name, value);
  // findOne : 한개의 값을 조회
  User.findOne({
    // 검색 조건 추가
    where: { name: name },
  }).then((e) => {
    Post.create({
      msg: value,
      user_id: e.id,
    });
  });
  res.send();
});

// sequelize를 사용한 데이터베이스 이용하기
app.post("/create", (req, res) => {
  const { name, age, msg } = req.body;
  // create() : 쿼리로 치면 insert 문
  User.create({
    name: name,
    age: age,
    msg: msg,
  });
  res.send("추가 완료");
});

app.listen(process.env.PORT, () => {
  console.log("Server On use PORT : 8080");
});
