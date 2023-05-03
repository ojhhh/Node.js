// net 내장 모듈을 가져오기
const net = require("net");
// port의 내용을 설정해줄 객체
const config = { port: 8080 };
// connect 메소드 : tcp 소켓을 만들고 지정할 포트로 연결 시도
const socket = net.connect(config);

socket.on("connect", () => {
  // 연결되면 connect 이벤트 실행
  console.log("연결 성공");

  socket.write("데이터 전송");
});

socket.on("data", (data) => {
  // tcp 소켓에서 데이터를 받으면 콜백 함수 실행
  console.log("받은 데이터 : ", data.toString());
  // end 메소드 : 데이터를 받으면 tcp 연결 종료
  socket.end();
});

// HTTP는 기본적으로 TCP 통신
// TCP 통신은 쌍방향 통신 가능
