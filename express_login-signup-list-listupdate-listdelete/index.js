// 처음 프로젝트를 만들면 할 것

// package.json 기본값으로 생성
// npm init -y

// 사용할 모듈 express ejs mysql2 path
// express ejs mysql2 설치 (path는 내장 모듈)
// npm install express ejs mysql2

// express 모듈 가져오기
const express = require("express");

// ejs는 express에서 지원하기 때문에 설치만 하면됨

// mysql2 모듈 가져오기
const mysql2 = require("mysql2");

// path 내장 모듈 가져오기
const path = require("path");

// 서버인스턴스 생성
const app = express();

//
// multipleStatements : 다중 쿼리문 사용 옵션
const _mysql = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "test1",
  multipleStatements: true,
});

// express의 views 속성(파일 경로)를 설정
// express에서 서버사이드 렌더링을 지원하기위해 view엔진을 사용
// view 엔진이 템플릿 파일을 보여주는 역활을 함
// views 내장 속성의 기본 경로는 ~/views
app.set("views", path.join(__dirname, "page"));

// view 엔진으로 ejs를 사용할 수 있게 설정
app.set("view engine", "ejs");

// express에서 기본적으로 bodyparser를 지원
// extended : 깊은 객체를 지원 여부. false 권장
// express의 기본 쿼리를 사용
app.use(express.urlencoded({ extended: false }));

// url에 "/"로 요청이들어오면 페이지 출력
app.get("/", (req, res) => {
  // render 메소드 : view엔진이 문자열을 html로 브라우저에 전달
  // 첫번째 매개변수 : 파일의 이름
  // 두번째 매개변수 : 전달할 데이터
  res.render("main");
});

// url에 "/list"로 요청이 들어오면 페이지 출력
// app.get("/list", (req, res) => {
//   res.render("list");
// });

// url에 "/signup"로 요청이 들어오면 페이지 출력
app.get("/signup", (req, res) => {
  res.render("signup");
});

// url에 "/login"로 요청이 들어오면 페이지 출력
app.get("/login", (req, res) => {
  res.render("login");
});

// login.ejs에서 login 버튼을 누르면 입력한 id와 password 값을 post방식으로 보냄
app.post("/login", (req, res) => {
  // 요청에 대한 내용은 req 객체에 들어 있음
  // req.body === {user_id : "", user_pw : ""}
  const { user_id, user_pw } = req.body;
  // console.log(user_id, user_pw);
  // res.send("user_id : " + user_id + " user_pw : " + user_pw);
  // 데이터베이스에 아이디와 패스워드가 있으면 로그인 시켜주는 쿼리문 작성
  const sql = "SELECT * FROM users WHERE user_id = ? AND user_pw = ?";
  _mysql.query(sql, [user_id, user_pw], (err, result) => {
    if (err) {
      // 로그인 실패
      res.render("mypage");
    } else {
      // 로그인 성공
      // console.log(result);
      res.render("mypage", { data: result[0] });
    }
  });
});

// 회원가입
app.post("/signup", (req, res) => {
  const { user_id, user_pw } = req.body;
  // 데이터베이스에 값을 넣는 쿼리문 작성
  const sql = "INSERT INTO users (user_id, user_pw) VALUES (?,?)";
  _mysql.query(sql, [user_id, user_pw], (err) => {
    // 에러가 나면 에러 내용 출력
    if (err) {
      res.render("signUpErr");
    } else {
      // 회원가입이 완료되면 로그인 페이지로 이동
      res.redirect("login");
    }
  });
  console.log(user_id, user_pw);
});

// 게시판 글목록 페이지
app.get("/list", (req, res) => {
  const sql = "SELECT * FROM testproducts";
  _mysql.query(sql, (err, result) => {
    res.render("list", { data: result });
  });
  // res.render("list", { data: null });
});

// 게시판 등록 페이지
app.get("/insert", (req, res) => {
  res.render("insert");
});

// /insert 페이지에서 작성된 내용이 넘어와 쿼리문 작성하여 mysql로 전달
app.post("/insert", (req, res) => {
  const { name, number, series } = req.body;
  const sql = "INSERT INTO testproducts (name, number, series) VALUES (?,?,?)";
  _mysql.query(sql, [name, number, series], () => {
    res.redirect("list");
  });
});

// 삭제
// delete 뒤에 :id는 키의 값의 이름을 임의로 정해둔것
// 다중 쿼리문 해설
// 1. id 값을 가진 행을 삭제하라는 쿼리문
// "DELETE FROM testproducts WHERE id = ?;
// 2. 카운트를 0으로 초기화
// SET @CNT = 0;
// 3. 해당 테이블의 id 값을 갱신. @CNT는 0이닌까 1을 더해줘서 1부터 시작하게 설정
// UPDATE testproducts SET testproducts.id = @CNT:=@CNT+1
// 4. id에 있는 AUTO_INCREMENT 속성을 0으로 초기화
// ALTER TABLE testproducts AUTO_INCREMENT = 0;

app.get("/delete/:id", (req, res) => {
  const sql =
    "DELETE FROM testproducts WHERE id = ?; SET @CNT = 0; UPDATE testproducts SET testproducts.id = @CNT:=@CNT+1; ALTER TABLE testproducts AUTO_INCREMENT = 0;";
  _mysql.query(sql, [req.params.id], () => {
    res.redirect("/list");
  });
});

// 게시물 수정 페이지 불러오기
app.get("/edit/:id", (req, res) => {
  const sql = "select * from testproducts where id = ?";
  const id = req.params.id;
  _mysql.query(sql, [id], (err, result) => {
    res.render("edit", { data: result[0] });
  });
});

// 수정된 게시물 적용
app.post("/edit/:id", (req, res) => {
  const { name, number, series } = req.body;
  const sql =
    "update testproducts set name = ?, number = ?, series = ? where id = ?";
  const id = req.params.id;
  _mysql.query(sql, [name, number, series, id], (err, result) => {
    res.redirect("/list");
  });
});

// 서버 대기상태
app.listen(8081, () => {
  console.log("Server On");
});
