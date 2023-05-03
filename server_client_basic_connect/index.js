// Nodejs를 활용한 TCP server 만들기
// net 이라는 내장 모듈을 사용

// net은 TCP 소켓을 만들어 사용할 수 있음
// TCP 연결을 맺어주는 프로토콜
// TCP 소켓을 생성하고 서버와 클라이언트간의 응답 요청을 맺을 수 있음

// 내장 모듈 net을 호출
const net = require("net");
const PORT = 4000;

// 서버 객체를 생성
// createServer 메소드로 콜백함수를 전달
// 클라이언트가 접속시 콜백함수 실행
const server = net.createServer((client) => {
  // 클라이언트가 접속시 실행

  // 클라이언트가 데이터를 보내서 데이터를 받으면
  client.on("data", (data) => {
    // 클라이언트가 보낸 데이터

    // 네트워크를 통해 전송되는 데이터는 바이너리 형식으로 전송
    // 클라이언트가 보낸 데이트는 Buffer 형태로 전송
    // 서버는 해석해서 문자열로 변환
    // 출력된 데이터는 Buffer 형식으로 인코딩
    console.log(data);
    console.log(JSON.stringify(data));
    console.log(data.toString());

    // data.toString()의 결과

    // 헤더 부분

    // GET / HTTP/1.1
    // Host: localhost:4000
    // Connection: keep-alive
    // sec-ch-ua: "Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"
    // sec-ch-ua-mobile: ?0
    // sec-ch-ua-platform: "macOS"
    // Upgrade-Insecure-Requests: 1
    // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
    // Sec-Fetch-Site: none
    // Sec-Fetch-Mode: navigate
    // Sec-Fetch-User: ?1
    // Sec-Fetch-Dest: document
    // Accept-Encoding: gzip, deflate, br
    // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

    // 바디 부분
  });
});

// 서버를 대기상태
server.listen(PORT, () => {
  console.log("server on");
});
