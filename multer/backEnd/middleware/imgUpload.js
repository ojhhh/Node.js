const multer = require("multer");
const path = require("path");

// mutler 함수 안에 매개변수로 객체 형태 인자 전달
// storage 속성을 통해서 업로드된 파일을 어디에 저장시킬지 지정
exports.Upload = multer({
  // diskStorage : 서버 컴퓨터 하드디스크에 파일을 업로드
  // 객체로 인자값을 전달
  storage: multer.diskStorage({
    // destination 속성 : 파일이 저장될 폴더를 설정
    destination: (req, file, done) => {
      // 콜백 함수 done : 두번쨰 인자값으로 폴더의 이름을 설정
      // 서버 컴퓨터 폴더명
      // 첫번째 매개변수 : 에러처리 부분
      // 두번째 매개변수 : 파일이 저장될 폴더 이름
      done(null, "uploads/");
    },
    // filename 속성 : 매개변수 file.originalname 은 클라이언트가 업로드한 파일의 이름을 나타냄
    // file.originalname : 사용자가 업로드한 파일 원본명
    filename: (req, file, done) => {
      // extname 메소드 : 파일의 경로를 매개변수로 받고 파일의 확장자를 추출
      const ext = path.extname(file.originalname);
      console.log("ext");
      console.log(ext);

      // 파일을 저장하는데 이름이 같으면 안되기 때문에 파일이름 뒤에 날짜를 붙여줌
      // basename 메소드 : 확장자를 추가, 제거 할 수 있음
      const filename =
        path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      // done 첫번째 매개변수 : 에러 처리 부분
      // 두번째 매개변수 : 저장할 파일명
      done(null, filename);
    },
  }),
  // 파일의 최대 사이즈 설정
  // 5MB 설정
  limits: { fileSize: 5 * 1024 * 1024 },
});
