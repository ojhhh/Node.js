// express와 템플릿 엔진을 사용해서 게시판 만들기
// ejs
// 템플릿 엔진은 서버에서 html을 만들어서 브라우저에서 보여줌

// html과 동일하고 js를 같이 추가해서 동적인 웹페이지를 만들 수 있는 템플릿 엔진
// express에서 ejs를 기본적으로 지원
// 서버측에서 html 템플릿을 그려주는 기법을 서버사이드 렌더링이라 함
// 서버사이드 렌더링의 장점은 검색기능 및 페이지 로딩이 빠름

// 사용할 모듈 : express, ejs, mysql2, body-parser, path
// body-parser : express 미들웨어로 요청 받은 body의 내용을 req요청 객체 안에 있는 body 객체로 담아줌
// req.body로 호출이 가능
// 미들웨어는 쉽게 요청과 응답을 하는 사이 중간에 동작하는 함수

// express 모듈 가져오기
const express = require("express");
// mysql2 모듈 가져오기
const mysql2 = require("mysql2");
// path 내장모듈 가져오기
const path = require("path");
// body-parser 내장모듈 가져오기
const bodyParser = require("body-parser");

// express 함수 실행
const app = express();

// express에 set 메소드와 use 메소드가 있음
// set 메소드 : express의 view 등등 설정 할 수 있음. 그려줄 파일이 있는 폴더의 경로 같은 설정을 할 수 있음
// use 메소드 : 요청 또는 응답시 실행되는 미들웨어를 추가

// express view 엔진은 html 등의 템플릿 파일을 보여주는 역활을 함
// 첫번째 views는 express의 내장 속성
app.set("views", path.join(__dirname, "views"));

// view 엔진을 ejs로 사용한다는 설정 추가
// 파일의 확장자는 ejs를 사용
app.set("view engine", "ejs");

// express 예전 버전에서 동작하는 방식
// app.use(
//   // urlencoded : form 데이터 파싱을 도와주는 미들웨어
//   bodyParser.urlencoded({
//     // extended 옵션 (false 권장)
//     // true : 쿼리 스트링 모듈의 기능이 좀더 확장된 qs 모듈을 사용
//     // false : express에 기본 내장된 쿼리 스트링 모듈을 사용
//     extended: false,
//   })
// );

// express 버전이 올라가면서 bodyParser를 지원해주기 때문에 따로 선언 하지 않아도됨
app.use(express.urlencoded({ extended: false }));

// mysql 연결
const _mysql = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "test1",
});

_mysql.query("select * from testproducts", (err, res) => {
  if (err) {
    // 테이블이 없으면 생성
    const sql =
      "CREATE TABLE testproducts (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    _mysql.query(sql);
  } else {
    console.log(res);
  }
});

// main.ejs에 데이터 보내기
app.get("/", (req, res) => {
  _mysql.query("select * from testproducts", (err, result) => {
    // console.log(res);
    // render 메소드 : view엔진이 문자열로 html로 브라우저에 반환하여 렌더링 해줌
    // 첫번째 매개변수 : view로 설정한 폴더 경로에 파일의 이름을 문자열로 전달
    // 두번째 매개변수 : 템플릿 엔진에서 사용할 데이터
    res.render("main", { data: result });
  });
});

// 리스트 추가 페이지
// URL이 같아도 get 방식 요청인지 post 요청인지에 따라 나뉨
app.get("/insert", (req, res) => {
  res.render("insert");
});

// insert.ejs에 form으로 넘어오는 데이터를 데이터베이스에 입력
app.post("/insert", (req, res) => {
  // req : 요청한 내용이 들어있음
  // body 객체 안에 form에서 요청으로 보낸 데이터가 객체로 들어있음
  // input들의 name으로 정해준 키로 값이 들어있음
  // insert.ejs에서 넘어온 데이터를 data에 담음
  const data = req.body;

  const sql = "insert into testproducts (name,number,series) values(?,?,?)";
  // query 메서드 두번째 매개변수 : 배열의 형태로 values를 전달
  _mysql.query(sql, [data.name, data.number, data.series], () => {});
  // redirect 메소드 : 매개변수로 전달한 URL로 페이지 이동
  res.redirect("/");
  // res.send();
});

// 삭제
app.get("/delete/:id", (req, res) => {
  // :id : url 요청에서 파라메터 값
  // 예) http://localhost:8080/delete/1
  // delete/ 뒤에 있는 1이 {id : 1} 이런식으로 객체로 넘어옴
  // req.params.id === 1

  const sql = "delete from testproducts where id = ?";
  _mysql.query(sql, [req.params.id], () => {
    res.redirect("/");
  });
});

app.listen(8080, () => {
  console.log("Server On");
});
