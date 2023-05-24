// 비행기 좌석 만들기
// 1, 2, 3번 비행기 좌석 예약

// 사용할 모듈
// socket.io express ejs

const express = require("express");
const path = require("path");
const socketIo = require("socket.io");
const app = express();

// 선택된 좌석을 보여줄 배열
let seats = [];

let temp = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let temp2 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let temp3 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let seatsArr = [temp, temp2, temp3];
// 선택한 비행기의 인덱스
let index = 0;

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/seats/:id", (req, res) => {
  index = req.params.id;
  seats = seatsArr[index];
  res.send(seats);
});

const server = app.listen(8080, () => {
  console.log("Server On");
});

const io = socketIo(server);

io.sockets.on("connection", (socket) => {
  socket.on("reserve", (data) => {
    console.log("Reservation");
    let seatTemp = seatsArr[data.selectCount];
    seatTemp[data.y][data.x] = 2;
    io.sockets.emit("reserve", data);
  });
});
