// 채팅방 만들기
// 유저간의 귓속말까지

const express = require("express");
const path = require("path");
const socketIo = require("socket.io");
const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

const server = app.listen(8080, () => {
  console.log("Server On");
});

app.get("/", (req, res) => {
  res.render("main");
});

let userId = [];
let userList = [];
let userTab1 = [];
let userTab2 = [];

const io = socketIo(server);

// 1, 유저들의 소켓이 생성되면
io.sockets.on("connection", (socket) => {
  console.log("user connect");
  // 유저 접속시 배열에 추가
  // 2. 유저의 socket.id를 배열에 저장
  // userId.push(socket.id);
  // console.log(socket);
  // user가 방에 들어오면
  socket.on("joinRoom", (room, name) => {
    socket.join(room);

    // 같은 방에 있는 유저에게 이벤트 푸쉬
    // 누가 방에 들어왔는지 알려줌
    if (room == "room1") {
      userTab1.push({ name, id: socket.id });
      io.to(room).emit("joinRoom1", room, name, userTab1);
    }
    if (room == "room2") {
      userTab2.push({ name, id: socket.id });
      io.to(room).emit("joinRoom2", room, name, userTab2);
    }
  });

  // 유저가 방을 떠날 때
  socket.on("leaveRoom", (room, name) => {
    // 유저가 채팅방을 떠날때 이벤트 푸쉬
    socket.leave(room);

    if (room == "room1") {
      userTab1 = userTab1.filter((value) => value.name != name);
      // console.log("userTab1");
      // console.log(userTab1);
      // userTab = userTab.filter((value) => value != name);
      // 누가 나갔는지 같은 방에 있는 유저에게 푸쉬
      io.to(room).emit("leaveRoom", room, name, userTab1);
    }
    if (room == "room2") {
      userTab2 = userTab2.filter((value) => value.name != name);
      // console.log("userTab2");
      // console.log(userTab2);

      io.to(room).emit("leaveRoom", room, name, userTab2);
    }
  });

  // 같은 방에 있는 유저끼리 채팅보이기
  socket.on("chat", (room, name, msg) => {
    io.to(room).emit("chat", name, msg);
  });

  socket.on("chat2", (id, name, msg) => {
    // console.log(name);
    // console.log(id);
    // console.log(id, name, msg);
    io.to(id).emit("chat2", name, " 귓속말 " + msg);
  });

  socket.on("whisper", (room, username) => {
    if (room == "room1") {
      const whisperId = userTab1.filter((value) => value.name == username);
      io.sockets.emit("whisper", whisperId, username);
    }
    if (room == "room2") {
      const whisperId = userTab2.filter((value) => value.name == username);
      io.sockets.emit("whisper", whisperId, username);
    }
  });

  // 유저의 접속이 끊어지면
  socket.on("disconnect", () => {
    console.log("user logout");
    // 유저 배열에서 삭제
    // filter로 해당 대상의 이름을 찾아 제거
    // 해당 userId가 아니면 배열에 다시 저장
    // userList = userList.filter((value) => value != socket.id);
    userTab1 = userTab1.filter((value) => value.id != socket.id);
    userTab2 = userTab2.filter((value) => value.id != socket.id);
    userId = userId.filter((value) => value != socket.id);
  });
});
