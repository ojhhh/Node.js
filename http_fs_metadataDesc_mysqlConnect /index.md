# HTTP 프로토콜

## 3-way handshaking

- 3-way handshaking : 클라이언트와 서버가 데이터 통신을 하기 전에 통신 준비가 되었다는 것을 확인하는 과정
- 라우저에서 URL을 입력하고 엔터를 누르면 HTTP 요청을 보내게 되면 TCP 3-way handshaking 과정을 거침
- 클라이언트가 서버에 연결 요청을 하고 서버는 연결 요청을 받아서 클라이언트에게 연결 요청 수락에 응답
- 클라이언트는 서버로부터 수락 확인을 보내면 연결
- SYN(synchronize sequence Number), ACK(Acknowledgment)
- 클라이언트가 SYN을 서버에 요청하고 서버는 SYN + ACK를 클라이언트에 연결 요청 수락을 응답
- 클라이언트가 서버로 ACK를 보내면 서버에서 응답

- 3-way handshaking 과정
-      SYN ->
- <- SYN + ACK
-      ACK ->

## 4-way handshake

- TCP 연결을 종료 수행
- 연결을 종료하기 위해 클라이언트와 서버의 상태를 서로 확인
- 서버가 FIN 메시지를 받고 클라이언트는 데이터가 없다는것을 의미하는 메시지인 ACK를 보내고 서버는 데이터가 더 없으면 자신이 보내지지 않는 데이터를 확인하고 전송한 후 클라이언트에 FIN 메시지를 전송
- 클라이언트는 서버가 더이상 전송할 데이터가 없다는 것을 확인하는 ACK 메시지를 보냄

- 4-way handshake 과정

-      SYN 연결 요청 ->
- <- SYN + ACK 연결 요청 수락
-      ACK 연결 요청 확인 ->

-      요청 ->
- <- 응답

-      FIN ->
- <- ACK
- <- FIN
-      ACK ->
