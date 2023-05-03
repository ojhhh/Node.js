// TCP server, Client를 만들기

// net 내장 모듈가져오기
const net = require("net");

// port 설정
const PORT = 8080;

// client와 server가 요청 응답으로 주고받는 메시지는 헤더랑 바디로 나눠짐
// 헤더의 내용은 전달하는 메시지(응답) 정보를 전달
// 바디는 전달하는 데이터의 내용이 들어있음

// HTTP1.1 기본 버전 프로토콜
// GET /host HTTP1.1
// host : 127.0.0.1:8080
// ....
// Content-type : text/html

// 요청 메소드
// GET : 데이터의 요청을 의미(데이터를 응답)
// POST : 데이터의 입력을 의미(데이터를 추가)
// PUT : 데이터의 수정을 의미
// DELETE : 데이터를 삭제하기 위해 사용
// OPTIONS : 웹서버가 지원하는 메소드의 종류를 요청

// HTTP 프로토콜 버전은 1.0 1.1 2.0이 있음

// body의 내용
// Buffer.from 메소드 : 문자열을 바이트 데이터로 변환
// HTTP 응답은 바이트 데이터로 전송되기 때문에 변환해줘야함
// body 문자열을 그대로 작성할 경우 인코딩에서 문제가 생길 수 있음
const body = Buffer.from("<div><p>Hello Nodejs</p></div>");

// 상태 코드
// 요청에 대한 응답의 결과를 나타낸 숫자 코드
// 1** : 거의 없음
// 2** : 성공
// 3** : 리다이렉트
// 4** : 요청한 페이지 없음
// 5** : 서버의 문제
// 가장 많이 사용하는 숫자 코드는 200(성공), 404(실패)가 있다
// Connection : 클라이언트와 서버의 연결 상태
// keep-alive 속성 : 클라이언트가 다음 요청을 보낼때 까지 연결 유지
// keep-Alive : 연결유지 시간 지정 timeout=4 == 연결을 4초동안 유지하고 종료
// Content-type : 전송되는 데이터의 타입 text/html == html 타입의 데이터 전송을 의미
// Content-length : 전송되는 데이터의 길이. 데이터의 끝을 알려주는 역할
const response = `HTTP/1.1 200 OK
Connection : keep-alive
keep-Alive : timeout=4
Content-type : text/HTML
Content-length : ${body.length}

${body.toString()}
`;

// 서버 객체 생성
const server = net.createServer((client) => {
  // 클라이언트 접속 시 실행
  // setEncoding 메소드 : 인코딩 방식 설정
  client.setEncoding("utf-8");

  // 클라이언트가 데이터를 보내고 데이터를 받으면 실행되는 콜백 함수
  client.on("data", (data) => {
    // data의 타입은 buffer
    console.log(data);
    // write 메소드 : 클라이언트의 응답을 보냄
    client.write(response);
  });
  // 클라이언트와 연결이 종료되면 실행되는 이벤트
  client.on("close", () => {
    console.log("접속종료");
  });
});

// 서버에 연결됬을때
server.on("connection", () => {
  console.log("접속성공");
});

// 서버를 대기상태로 만듬
server.listen(PORT, () => {
  console.log("server on. port : " + PORT);
});
