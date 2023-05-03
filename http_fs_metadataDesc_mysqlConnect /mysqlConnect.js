// mysql 연결
// npm으로 외부모듈 설치 받아 사용

// mysql2 설치 명령어
// npm install mysql2

// npm install
// package.json에 있는 dependencies의 내용의 모듈을 다 설치

// mysql 모듈은 콜백 기반으로 promise를 기반으로 하기 때문에 사용하기 힘듬
// mysql 모듈을 왜 안쓰고 mysql2 모듈을 쓰는지 찾아보기
// 1. 성능 : MySQL2가 최적화된 구문 분석 및 처리를 사용하고, 더 빠른 네이티브 바인딩을 제공
// 2. Promise 지원 : MySQL2는 Promise를 지원하여, 비동기 작업을 수행할 때 더 간결하고 가독성 높은 코드를 작성
// 3. Prepared Statements : 이 기능은 SQL 쿼리에 값이 삽입될 때 발생할 수 있는 SQL Injection 공격을 방지하는 데 도움 (보안성 향상)
// 4. Binary Protocol : MySQL2는 MySQL 데이터베이스와의 통신에 Binary Protocol을 사용합니다. 이는 텍스트 프로토콜에 비해 효율적이고 빠르며, 데이터 전송량을 줄여줌
// 5. MySQL 서버 측 커서 : MySQL2는 MySQL 서버 측 커서를 지원. 이 기능을 사용하면 대용량 데이터 집합을 처리할 때 메모리 사용량을 줄여줌

// mysql2 모듈 가져오기
const mysql = require("mysql2");

// createConnection : mysql 연결하기
// 매개변수로 연결할 mysql의 옵션을 전달
// host : 연결할 호스트를 나타냄 127.0.0.1 or localhost
// port : 연결할 포트 3306
// user : 사용자 이름
// password : 사용자 비밀번호
// database : 어떤 데이터베이스를 연결 시킬건지
const temp = mysql.createConnection({
  // host localhost로 썻다가 안되서 1시간동안 열받아있었음
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "root",
  database: "test1",
});

// temp에 연결한 mysql 객체 반환
// 객채안에서는 쿼리문을 작성해서 데이터 베이스 쿼리 작업을 시켜줄 수 있는 메소드가 있음
// query() : 쿼리문을 매개변수로 전달
temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    console.log("not found");
    // products 테이블이 없으면 만들어 주라는 쿼리문 작성
    // id 컬럼은 INT형
    // AUTO_INCREMENT : 자동으로 값이 증가하는 설정. PRIMARY KEY에 주로 사용(고유키)
    // PRIMARY KEY : 고유한 값을 가지고 있는 컬럼
    // name, number, series 컬럼은 VARCHAR 문자열이고 ()안에 글자 수를 정해 줄 수 있음
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql, (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log("create table products");
  } else {
    console.log("found table");
    console.log(res);
    temp.end();
  }
});

// temp.query("SELECT * FROM testtest", (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(res);
//   }
// });
