-- mysql extensions 설치

-- 데이터베이스 
-- 데이터를 저장하는 공간

-- sql 명령어 사용
-- 구현된 기능을 실행시키기 위해 사용하는 특정한 언어
-- 데이터를 보관하거나 저장하거나 삭제 또는 수정 작업을 할 수 있음

-- 관계형 데이터베이스 
-- mysql, oracle, mariaDB 

-- 비관계형 데이터베이스
-- mongoDB

-- 관계형 데이터베이스와 비관계형 데이터베이스의 차이는 스키마의 차이

-- CLI로 mysql 접속
-- mysql -uroot -p

-- 스키마 확인
-- show databases;

-- 데이터 정의어(DDL)
-- 데이터 조작어(DML)
-- 데이터 제어어(DCL)

-- DDL 
-- CREATE, SHOW, DROP, ALTER

-- DML
-- SELECT, INSERT, UPDATE, DELETE

-- 데이터베이스 만들기
CREATE DATABASE testmysql;

-- 데이터베이스 목록 확인
SHOW DATABASES;

-- 데이터베이스 삭제
DROP DATABASE testmysql;

-- 사용할 데이터베이스 지정
USE testmysql;

-- 데이터베이스 안에 있는 테이블 확인
SHOW tables;

-- 테이블 생성
-- PRIMARY KEY : 한개만 들어 갈 수 있고 중복되지 않음
CREATE TABLE store (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tel VARCHAR(20)
);

CREATE TABLE store2 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tel VARCHAR(20)
);

-- 테이블 필드명, 타입 확인 
DESC store;

-- 데이터 타입
-- 숫자형, 문자형, 날짜형, 이젠데이터 타입
-- 숫자형
-- INT : 4byte. 범위 : 21억

-- 문자형
-- VARCHAR : 255byte 가변데이터(선언한 범위보다 작으면 크기를 맞춤)
-- CHAR : 255byte 고정데이터(선언한 범위 전체를 무조건 사용)
-- TEXT : 65535byte

-- 날짜형
-- DATE : 년 월 일 을 표시
-- TIME : 시간을 표시
-- DATETIME : 년 월 일 시간을 표시 (YYYY-MM-DD-HH:MM:SS 형식으로 표시)
-- TIMESTAMP : 년 월 일 시간(INTERGER) 4byte

-- 이진데이터 타입
-- BLOB : 이미지 저장

-- KEY
-- PRIMARY KEY : 중복 입력 안됨. 테이블에 1개씩 넣을 수 있음. NULL 사용 불가
-- UNIQUE KEY : 중복 입력은 불가하지만 여러개 설정 가능하며 NULL 값 허용
CREATE TABLE user (
  user_id VARCHAR(20) PRIMARY KEY,
  user_pw VARCHAR(20) NOT NULL,
  user_name VARCHAR(20) NOT NULL,
  gender CHAR(4) DEFAULT "M",
  date DATETIME DEFAULT now()
); 

DESC user;

-- 데이터 조작어
-- SELECT, INSERT, UPDATE, DELETE

-- 테이블에 값을 추가
INSERT INTO user (user_id, user_pw, user_name, gender) VALUES ("aa","aa","aa","M");

-- 테이블의 내용 전부 출력
SELECT * FROM user;

-- 테이블 열 검색
SELECT * FROM user WHERE user_id = "aa";
SELECT * FROM user WHERE gender = "M";

-- 테이블 열 수정
-- SET : 해당 값을 수정할 떄 사용
UPDATE user SET gender = "F" WHERE user_id = "bb";
UPDATE user SET user_pw = "bb",user_name = "bb" WHERE user_id = "bb";

-- 테이블 열 삭제
DELETE FROM user WHERE user_id = "bb";

-- 게시판 테이블 생성
-- 게시판 테이블 이름 : border
-- 컬럼 id, content, writer, date, likes
-- id = INT형, 11자, 자동으로 증가, 고유키
-- content = TEXT 타입, null 추가 가능
-- writer = VARCHAR타입, 40자, null 값 안되게
-- likes = INT 11자, 기본값 0
-- row 6개 추가

CREATE TABLE border (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  writer VARCHAR(40) NOT NULL,
  likes INT(11) DEFAULT 0
);

DESC border;
INSERT INTO border(content, writer, likes) VALUES ("test1","test1",1);
INSERT INTO border(writer, likes) VALUES ("test",2);
INSERT INTO border(content, writer, likes) VALUES ("test3","test3",3);
INSERT INTO border(content, writer, likes) VALUES ("test4","test4",4);
INSERT INTO border(content, writer, likes) VALUES ("test5","test5",5);
INSERT INTO border(content, writer, likes) VALUES ("test6","test6",6);
INSERT INTO border(content, writer) VALUES ("test7","test7");


SELECT * FROM border;

-- 내용 정리
-- CLI에서 mysql 접속 : mysql -uroot -p
-- 데이터베이스 생성 : create databases [데이터베이스 이름]
-- 데이터베이스 삭세 : drop database [데이터베이스 이름]
-- 테이블 생성 :  create table [테이블 이름] (
--             [필드명] [데이터 타입] [필드 속성]
--              )
-- 모든 데이터베이스 조회 : show databases;
-- 모든 테이블 조회 : show tables;
-- 사용할 데이터베이스 선택 : use [데이터베이스 이름]
-- 테이블 필드 보기 : desc [테이블 명]
-- SELECT * FROM [테이블 이름] : 테이블 전체 조회
-- SELECT 필드1, 필드2 FROM [테이블 명] : 필드1, 필드2에 대한 테이블 전체 조회
select id, likes from border where id = 1;
-- DELETE FROM [테이블 이름] WHERE [필드명] = [값]; : 테이블의 입력된 값을 가진 열을 삭제 
-- INSERT INTO [테이블 이름] (필드 1, 필드 2) VALUES (필드1의 값, 필드2의 값); : 테이블에 값을 추가 
-- UPDATE [테이블 이름] SET [필드명] = [수정할 값], [필드명] = [수정할 값] WHERE [필드명] = [값]; : where 절이 가르치는 값을 가진 열의 값을 SET의 값으로 변경?
-- SELECT * FROM [테이블명] WHERE [필드] LIKE "%AB"; : LIKE "%AB" -> AB로 끝나는 값을 찾음
-- SELECT * FROM [테이블명] WHERE [필드] LIKE "AB%"; : LIKE "AB%" -> AB로 시작하는 값을 찾음
-- ALTER TABLE [기존 테이블 명] RENAME [새로운 테이블 이름] : 테이블 이름 바꾸기
-- ALTER TABLE user RENAME user1;
-- ALTER TABLE [테이블 이름] CHANGE [기존 컬럼 이름][새로운 컬럼 이름] Type : 컬럼 이름 바꾸기
-- ALTER TABLE user CHANGE user_pw user_pw2 VARCHAR(20);
-- ALTER TABLE [테이블 이름] MODIFY [컬럼 이름] TYPE : 컬럼의 타입을 변경
-- ALTER TABLE user MODIFY user_pw2 CHAR(20);
-- ALTER TABLE [테이블 이름] DROP [필드 명] : 해당 필드 삭제
-- ALTER TABLE [테이블 이름] AUTO_INCREMENT = 0 : 해당 테이블의 AUTO_INCREMENT 속성을 0으로 초기화
-- ALTER TABLE [테이블 이름] ADD [필드 이름] TYPE : 해당 테이블에 맨 뒤에 필드를 추가
-- ALTER TABLE [테이블 이름] ADD [필드 이름] TYPE first : 해당 테이블 맨 앞에 필드를 추가
-- DELETE FROM [테이블 이름] WHERE [컬럼 이름] = [값]; : 조건을 가진 열 삭제
-- SELECT * FROM [테이블 이름] ORDER BY [필드 이름] DESC | ASC ; : DESC 내림차순 ASC 오름차순

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20)
);

CREATE TABLE post (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(20)
);

show tables;

-- post 테이블에 userID 필드 추가 타입은 INT
ALTER TABLE post ADD COLUMN userID INT;
desc post;

-- CONSTRAINT : 오류가 났을때 확일 할 수 있는 제약 조건 명령어 (임의 지정)
-- FOREIGN KEY : 참조키.
-- REFERENCES : 참조키가 참조하는 테이블의 영을 지정
ALTER TABLE post ADD CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id);

INSERT INTO user (name) VALUES ("cc");

INSERT INTO post (title, userID) VALUES ("333",3);

-- INNER JOIN : 참조키르르 가지고 관계가 맺어져 있는 테이블을 조회
SELECT * FROM user INNER JOIN post ON user.id = post.userID WHERE user.id = 1;
SELECT user.id, post.title FROM user INNER JOIN post ON user.id = post.userID WHERE user.id = 1;

-- 유저가 글을 등록하고 해당 유저가 작성한 글을 볼 수 있는 페이지 작성