const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

const welcome = document.getElementById("welcome");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName = "";
let myPeerConnection;

async function getCameras() {
  try {
    // 유저의 디바이스 정보를 가져옴
    const devices = await navigator.mediaDevices.enumerateDevices();
    // console.log(devices);
    // 유저의 카메라에 접근
    const cameras = devices.filter((device) => device.kind === "videoinput");
    // console.log(cameras);
    // 선택한 카메라가 select에 보이게 하기
    const currentCamera = myStream.getVideoTracks()[0];
    // 유저의 카메라가 여러개 있을때 카메라를 고를 수 있는 설정
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      // 선택된 카메라가 사용중인 카메라의 label과 같다면
      if (currentCamera.label == camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

async function getMedia(deviceId) {
  // 초기에 카메라가 선택되지 않았을 때
  const init = {
    audio: true,
    video: { facingMode: "user" },
  };
  // 카메라 deviceId가 매개변수로 호출됬을 때
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : init
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (error) {
    console.error(error);
  }
}

// getMedia();

// 마이크 on/off
function handleMuteClick() {
  // console.log(mySteam.getAudioTracks());
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
// 카메라 on/off
function handlecameraClick() {
  // console.log(mySteam.getVideoTracks());
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

// select 내용 감지
async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = mySteram.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .finde((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handlecameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// 룸 이름을 입력하면 해당 룸으로 이동되고 숨겨져있던 getMedia가 나옴
const welcomeForm = welcome.querySelector("form");
async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  // console.log(call);
  await getMedia();
  makeConnection();
}
async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  await initCall();
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code

socket.on("welcome", async () => {
  // console.log("someone join");
  // offer는 최초에 방에 들어온사람이 다음에 들어온 사람에게 메세지를 보냄 (Peer A)
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  // console.log(offer);
  socket.emit("offer", offer, roomName);
});

// offer를 Peer A에게서 받음 (Peer B)
socket.on("offer", async (offer) => {
  // console.log(offer);
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  // console.log(answer);
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
});

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  console.log("received cadidate");
  myPeerConnection.addIceCandidate(ice);
});

// RTC Code

function makeConnection() {
  // STUN Server 생성
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
  // console.log(data);
  console.log("send cadidate");
  socket.emit("ice", data.candidate, roomName);
}
function handleAddStream(data) {
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}
