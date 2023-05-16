// crypto 내부 모듈을 사용한 비밀번호 암호화
// 기본적인 암호화 알고리즘 기능을 제공

// 비밀번호를 만들때 단방향 암호화를 사용
// 단방향 암호화는 원래 값을 알 수 없게 복잡한 알고리즘으로 암호화 시켜주어 복호화가 불가능 하기 때문에  원본값을 알 수 없음 (회원 가입이나 비밀번호 변경 할 경우에 사용)
// 양방향 암호화는 복호화가 가능하여 원본값을 알 수 있어 데이터를 암호화해서 안전한게 전달할 때 사용

const crypto = require("crypto");

// 임의의 비밀번호 설정
const pw = "admin";

// 해시 객체 생성
// 해시화 : 알고리즘을 통해 데이터를 고정된 크기의 고유한 값으로 바꿔줌
// sha256 알고리즘 사용
// sha256 : 데이터를 256비트의 고정 크기 해시 값으로 변환해주는 알고리즘
// 원본데이터의 길이에 상관 없이 항상 256비트(32byte)의 해시 값을 생성
// let hashA = crypto.createHash("sha256");

// 해시객체에 비밀번호 저장
// update 메소드를 사용하여 암호화 시킬 대상을 매개변수에 입력
// let hashing = hashA.update(pw);

// 객체 내부에 false 값이 있는 이유는 인코딩이 완료되지 않은 상태이기 때문
// console.log(hashing);
// Hash {
//   _options: undefined,
//   [Symbol(kHandle)]: Hash {},
//   [Symbol(kState)]: { [Symbol(kFinalized)]: false }
// }

// digest 메소드를 사용해서 해시값을 매개변수로 반환 받을 인코딩 방식 지정
// 해시값을 16진수로 받음 // 16진수로 받는 이유는?
// let hasingString = hashing.digest("hex");
// console.log(hasingString);
// 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
// 같은 문자열을 같은 알고리즘으로 해시화 하는 결과이기 때문에 암호화 시키는 문자열이 같으면 결과값도 계속 같게 나옴

// salt 값은 랜덤한 값을 만들어 원본 데이터에 추가하여 암호화 시켜주기 때문에 에측이 불가한 데이터를 만들어줌
// crypto.randomBytes(32, (err, result) => {
//   // 32byte 길이의 랜덤한 byte가 생성
//   if (err) {
//     console.error(err);
//   } else {
//     // 그냥 result를 출력하면 버퍼로 출력하기 때문에 toString으로 문자열로 만들어주는데 16진수를 사용하여 바꿔줌
//     console.log(result.toString("hex"));
//   }
// });
// 3번 실행하였고 각각 다른 결과값이 나온것을 확인 할 수 있음
// 2b2525c337b81400785816f02e2e49e81a3a2316ba4bdc1f5438806e3ad85c02
// ca088f0ebad414d52316685ac9fec2154b05cd32a55d7e83857478337ac5a3e5
// be351893cc0c98e5a7bbe1c363da08739565b1b94024f8c914a9af319f759c1f

// salt 값을 만들어 주는 함수 작성
const createSalt = () => {
  // 암호화에 시간이 걸림
  // resolve는 then();
  // reject는 catch();
  return new Promise((resolve, reject) => {
    // 랜덤 바이트 길이
    crypto.randomBytes(64, (err, result) => {
      if (err) reject(err);
      // 실패시 err 객체 reject 메소드로 반환
      // 성공하면 resolve 메소드로 결과를 16진수로 변환해서 반환
      resolve(result.toString("hex"));
    });
  });
};

// key 스트레칭 기법을 사용하여 해시함수를 일부로 여러번 반복 시켜서 오래 걸리게 만드는 기법
// 비밀번호를 대입해서 공격하는 해킹 기법을 어렵게 하기 위해 암호화 작업을 일부러 오래걸리게함

// pbkdf2 메소드 사용
const createHash = (salt, password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, // 해싱할 문자열 전달
      salt,
      12312, // 반복 횟수 지정
      64, // 해시값 byte
      "sha256", // hash 알고리즘
      (err, hash) => {
        if (err) reject(err);

        resolve(hash.toString("hex"));
      }
    );
  });
};

const test = async () => {
  const salt = await createSalt();
  const hash = await createHash(salt, "password");
  console.log(hash);
};

// test();

// 동일한 salt 값을 가지고 있고
// pbkdf2을 사용하여 hash화 하면
// 실행할때마다 결과값이 다르게 나올탠데 어떤방법으로 같고 다름을 판단하는거지?

// 3번 실행한 결과
//c66fe1081cbf8f7e770fc700cb893dae5422482af21345b5c0a2d9575e3dbee90143ffecb2e2810e330aac6b64e51ef09d74922e74d84ddfdbf39fe055672307
// c33b3b255bacada6ebd2510fcec6d035fa218bd54485c0b9ddbf3648a2028a2eee2fac6e323bd6631b0facbb22edf14ae8def6f17a95d1d381044fda143d36a1
// 8ee528255664b2bbfbc8b5c7664a8a37e2c40115c18c14f9cfec5420cefa5782d8cb0af2d676d88f43e3d1c1f6a6bfd2dda385f019d3d860a78d8ff0ad416516

// 간단한 회원가입
// 각각의 회원 마다 고유의 salt 값을 가지게함
const express = require("express");
const path = require("path");
const mysql2 = require("mysql2/promise");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

const mysql = mysql2.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "test",
  multipleStatements: true,
});

// 테이블 초기화
const userInit = async () => {
  try {
    await mysql.query("SELECT * FROM crypto_users");
  } catch (error) {
    await mysql.query(
      "CREATE TABLE crypto_users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128), salt VARCHAR(128))"
    );
  }
};

userInit();

app.get("/", (req, res) => {
  res.render("join");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/join", async (req, res) => {
  const { user_id, user_pw } = req.body;
  const salt = await createSalt();
  const hash = await createHash(salt, user_pw);

  await mysql.query(
    "INSERT INTO crypto_users (user_id, user_pw, salt) VALUES (?, ?, ?)",
    [user_id, hash, salt]
  );

  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;
  const [result] = await mysql.query(
    "SELECT * FROM crypto_users WHERE user_id = ?;",
    [user_id]
  );
  // 옵션 체이닝
  if (result[0]?.salt) {
    const salt = result[0].salt;
    const hash = await createHash(salt, user_pw);
    if (hash == result[0].user_pw) {
      res.send("login success");
    } else {
      res.send("wrong password");
    }
  } else {
    res.send("no user");
  }
});

app.listen(8080, () => {
  console.log("Server On listen PORT = 8080");
});
