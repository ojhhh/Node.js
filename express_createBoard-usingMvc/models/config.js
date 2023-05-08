// 전에 사용하던 createConnection은 콜백함수 기반
// createConnection : 기본적인 연결을 해주는 메소드. 단일 클라이언트 접속에 용이
// createPool 메소드 : 커넷션 풀을 생성하고 관리할 수 있는 메소드. promise 객체를 반환하기 때문에 다중 클라이언트와 데이터베이스 통신을 할때 유용
const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "test2",
  multipleStatements: true,
});

// mysql 접속 확인
mysql.getConnection((err, res) => {
  console.log(err);
});

// 모듈로 다른 파일로 보냄
// module.eports
module.exports = mysql;
