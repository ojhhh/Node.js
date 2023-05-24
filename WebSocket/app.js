// 웹 소켓
// 양방향 통신을 위해 사용
// 웹소켓 장점 : 한번 연결 할때 헤더 값을 전송하고 그 후에 요청시 헤더 값을 전송하지 않기 때문에 많은 데이터가 전송되지 않는다(오버헤드)
// 실시간 채팅을 구현하거나 실시간으로 해야하는 작업이 있을 경우 사용
// 가상화폐 거래소 같은 경우 등 데이터 전송이 자주 일어나는 경우 웹소켓을 사용해서 구현하는게 좋음

// socket.io 라이브러리 사용
// 게시물을 작성하거나 댓글을 작성할때 작성한 내용을 보기위해서 새로고침을 해야하는데 실시간으로 보이게 할 수 있음

// express socket.io ejs

// 서로 다른 2명의 유저끼리 채팅하는 기능 구현
const express = require("express");
const socketIo = require("socket.io");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});
app.get("/test", (req, res) => {
  res.render("test");
});

const server = app.listen(8080, () => {
  console.log("Server On");
});

// listen 상태의 서버객체를 매개변수로 전달하여 소켓연결
const io = socketIo(server);

let userId = [];

// 연결된 소켓에 이벤트 등록
// connection : 접속시 실행되는 이벤트
// 접속한 클라이언트의 socket이 매개변수로 들어옴
io.sockets.on("connection", (socket) => {
  console.log("user connect");
  // 접속한 유저가 누구인지 판별
  console.log(socket.id);
  userId.push(socket.id);

  console.log("유저가 접속 했을때");
  console.log(userId);

  // 클라이언트 측에서 이벤트가 푸쉬면 실행 시킬 이벤트
  socket.on("hi", (data) => {
    // 자신에게 이벤트 푸쉬
    console.log(data, "event for client");
    // 모든 대상에게 이벤트 푸쉬
    // io.sockets.emit("hi","all client");
    // 자기 제외 모든 대상에게 이벤트 푸쉬
    // socket.broadcast.emit("hi", data.msg);
    // 비밀 대화 이벤트를 푸쉬할 유저의 아이디값을 매개변수로 전달
    // -> data.id가 main.ejs에서 넘어온 user의 input안의 값인 줄알았는데 아니였음
    // -> data.id는 서버가 각 클라이언트에게 부여하는 고유의 식별자이기 때문에 socket.id를 입력해줘야함
    io.sockets.to(data.id).emit("hi", data.msg);
  });

  // 유저가 나갔을때
  socket.on("disconnect", () => {
    console.log("logout");
    userId = userId.filter((value) => value != socket.id);
    console.log("유저가 나갔을떄");
    console.log(userId);
  });
});
