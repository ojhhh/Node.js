// npm init : package.json 파일을 만들어줌
// 파일을 만들떄 속성들을 입력해야함

// 메타데이터
// 메타데이터 : 데이터들을 설명해주는 데이터(속성)
//  ㄴ 책이 있으면 제목, 저자, 출판사 등의 책의 정보를 모아둔 json 파일 같은거
// 프로젝트 정보를 가지고 있는 json 파일
// 메타데이터 설명을 가지고 있는 json 파일 초기화 명령어
// npm init -y : 패키지의 내용을 기본값으로 만들어줌

// {
//   "name": "20230501",  // 패키지 이름
//   "version": "1.0.0",  // 패키지 버전
//   "description": "",   // 패키지 설명
//   "main": "index.js",  // 모듈화를 시킬때 메인 파일
//   "directories": {
//     "test": "test"
//   },
//   "scripts": {         // 자주 실행할거 같은 명령어 작성. npm start
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start: "node index.js"    // npm start 로 실행 하면 index.js가 열림
//   },
//   "keywords": [],      // 검색 키워드를 배열의 형태로 작성
//   "author": "",        // 패키지 제작자
//   "license": "ISC"     // 패키지의 라이센스 (ISC는 공개)
//   "dependencies": {
//    "mysql2": "^3.2.4"  // ^3.2.4 에 ^는 이 버전이 없으면 다른 버전을 찾아 설치 받으라는 내용
//    }
// }
