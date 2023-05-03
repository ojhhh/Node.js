// fs 모듈 : 파일 시스템 파일 생성, 삭제, 읽기, 쓰기 작업을 할 수 있음
const fs = require("fs");

// existsSync() : 폴더가 있는지 확인하는 메소드. true, false로 반환
// 동기적으로 작동. Sync 구문이 있는 메소드는 동기적으로 동작
// 매개변수로 폴더의 경로를 작성
// let folder = fs.existsSync("./test");
let folder = fs.exists("./test", () => {});
console.log(folder);

// mkdir() : 폴더 생성
// 첫번째 매개변수 : 생성할 폴더의 경로
// 두번째 매개변수 : 폴더 생성시 호출할 콜백 함수
// 콜백함수 첫번째 매개변수 : 에러의 내용 객체를 전달
if (!folder) {
  // 비동기 실행
  fs.mkdir("./test", (err) => {
    if (err) {
      console.log(err);
      console.log("error");
    } else {
      console.log("create folder : test ");
    }
  });

  // 동기 실행
  // fs.mkdirSync("./test");
  // console.log("create test folder");
}

// 폴더 안에 파일 추가
// writeFile() : 파일에 데이터를 작성
// 첫번째 매개변수 : 파일의 경로
// 두번재 매개변수 : 파일에 작성할 내용
// 세번째 매개변수 : 콜백 함수
// 콜백함수 첫번째 매개변수 : 에러 내용을 객체 형식으로 전달

// 비동기 실행
fs.writeFile("./test/temp.txt", "Hello nodejs", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("create file : temp.txt");
  }
});

// 동기 실행
// fs.writeFileSync("./test/temp.txt", "Hello nodejs");

// readFile() : 파일의 내용 읽어오기
// 첫번째 매개변수 : 파일의 경로
// 두번째 매개변수 : 인코딩 내용 작성
// 인코딩 내용을 작성하지 않으면 null
// buffer 객체로 읽어옴
// 세번째 매개변수 : 콜백 함수
// 콜백함수 첫번째 매개변수 : 에러 내용을 객체 형식으로 전달
// 콜백함수 두번째 매개변수 : 읽어온 파일의 내용
// 비동기 실행
// fs.readFile("./test/temp.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("temp.txt : ", data);
//   }
// });

// 동기 실행
// 반환값으로 파일을 읽어옴
let temp = fs.readFileSync("./test/temp.txt", "utf-8");
// 어쩔떄 나오고 어쩔때 안나오는거보니 동기 실행이라 파일을 읽는 시간보다 console.log를 실행하는 시간이 빠르면 temp에 아무것도 찍히지 않고 console.log를 실행하기전에 readFileSync 작업이 끝나면 정상적으로 출력하는거 같음
console.log("temp.txt : ", temp);

// rm() : 폴더 삭제
// 첫번째 매개변수 : 삭제할 폴더의 경로
// 두번째 매개변수 : 옵션을 객체 형식으로 전달 {recursive : true}
// recursive 키의 값에 따라 true나 false를 반환. 폴더안에 파일까지 제거
// 세번째 매개변수 : 콜백 함수
// 콜백함수 첫번째 매개변수 : 에러 내용을 객체 형식으로 전달
// fs.rm("./test2", { recursive: true }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("remove folder : test2");
//   }
// });
