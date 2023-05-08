// 게시판 기능이 작성 될 공간

// config.js의 mysql 가져오기
const mysql = require("./config");

const posts = {
  initTable: async function () {
    // error 가 발생하면 nodejs는 실행을 멈춰버림
    // 그렇기 때문에 오류가 발생해도 응용프로그램이 종료되지 않게 try catch 사용
    try {
      // 배열의 구조분해할당를 사용해서 순서대로 넘김
      // 구조분해할당으로 가져온 이유는 ?
      // 구조분해할당 없이 출력하면 버퍼나 오만게 다뜸
      const [result] = await mysql.query("select * from posts");
      console.log(result);
    } catch (error) {
      // console.log(error);
      await mysql.query(
        "create table posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(100))"
      );
    }
  },
  // 게시판의 모든 글을 조회
  viewPostAll: async function () {
    try {
      const [result] = await mysql.query("select * from posts");
      return result;
    } catch (err) {
      console.log("게시글 전체 조회 에러");
    }
  },
  // 게시글을 선택했을때 글 하나를 보여주는 함수
  // async await를 쓰던지 then을 사용하던지 둘중 하나만 사용
  // 매개변수로 id를 받아 쿼리문에 전달
  selectPost: async function (id) {
    try {
      const [result] = await mysql.query("select * from posts where id = ?", [
        id,
      ]);
      // result는 1개 밖에 없을 거기 떄문에 배열의 첫번째 결과값 출력하기 위해 result[0] 입력
      console.log("select : ", result[0]);
      return result[0];
    } catch (err) {
      console.log("게시글 선택 조회 에러");
    }
  },
  // 게시글 추가
  insert: async function (title, content) {
    try {
      await mysql.query("insert into posts (title, content) values (?, ?)", [
        title,
        content,
      ]);
      console.log("게시글 추가 완료");
    } catch (err) {
      console.log("게시글 추가 에러");
      console.error(err);
    }
  },
  // 게시글 수정
  update: async function (id, title, content) {
    try {
      await mysql.query(
        "UPDATE posts SET title = ?, content = ? WHERE id = ?",
        [title, content, id]
      );
      console.log("게시글 수정 완료");
    } catch (err) {
      console.log("게시글 수정 에러");
      console.error(err);
    }
  },
  // 게시글 삭제
  delete: async function (id) {
    try {
      // @CNT 변수 선언
      // set @CNT = 0;
      // posts 테이블의 id 값을 1로 초기화
      // update posts set posts.id = @CNT:=@CTN+1;
      // posts 테이블의 AUTO_INCREMENT 속성의 값을 0으로 초기화. 그렇지 않으면 다음 글을 작성할때 전에 썻던 마지막 번호의 다음 값을 id로 부여하기 떄문
      // alter table posts AUTO_INCREMENT = 0;
      await mysql.query(
        "delete from posts where id = ?; SET @CNT = 0; update posts SET posts.id = @CNT:=@CNT+1;alter table posts AUTO_INCREMENT = 0;",
        [id]
      );
      console.log("게시글 삭제 완료");
    } catch (err) {
      console.log("게시글 삭제 에러");
      console.error(err);
    }
  },
};

// posts.initTable();
// posts.insert("insert test", "insert test");
// posts.update(1, "modify test", "modify test");
// posts.detate(2);

module.exports = posts;
