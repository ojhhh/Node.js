// 도메인 및 https 설정

// nvm : 노드 버전 매니저
// nodejs 설치하고 다른 버전으로 설치할때 삭제하고 다시 설치할 필요없이 바꿀 수 있어 버전 관리가 편함

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh
// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

// 소스 파일 적용
// source ~/.bashrc

// 전체 목록 확인
// nvm list-remote

// 원하는 버전 선택하고 설치
// nvm install [버전]
// 예) nvm install 16

// nginx를 사용하여 프록시 설정
// proxy : 통신을 할떄 중간에서 대신 통신해 주는 역할(중개)
// 클라이언트는 proxy 서버를 서버로 알고 서버는 proxy 서버를 클라이언트로 인식

// 서버의 위치에 따라 포워드 프록시와 리버스 프록시로 구분
// 리버스 프록시 : 프록시 서버가 서버의 앞에 위치하고 클라이언트가 서버에 요청하면 리버스 프록시가 호출되고 리버스 프록시는 서버에게 요청해서 응답을 받고 클라이언트에게 전송
// 클라이언트가 직접 서버에 요청하는것이 아니라 프록시 서버가 요청을 받아 서버로 전달
// 클라이언트 -> 브라우저 -> proxy 서버 -> 서버
// 서버 -> proxy 서버 -> 브라우저 -> 클라이언트
// nginx 설치
// sudo apt-get install nginx
// nginx 실행
// sudo service nginx start
// nginx 상태 확인
// sudo service nginx status
// nginx 종료
// sudo service nginx stop

// proxy 설정 파일 경로
// /etc/nginx/sites-enabled/default

//   48         location / {
//   49                 # First attempt to serve request as file, then
//   50                 # as directory, then fall back to displaying a 404.
//   51                 # try_files $uri $uri/ =404;
//   52
//   53                 proxy_set_header HOST $host;
//   54                 proxy_pass https://127.0.0.1:8080;
//   55                 proxy_redirect off;
//   56         }

// 51번줄 주석
// 53, 54 55줄 내용 추가

// proxy_set_header 요청이 들어온 브라우저의 host내용을 넘겨줌
// proxy_pass 80번 포트로 들어온 요청을 8080 포트로 전달
// proxy_redirect off는 SPA일 경우 redirect를 없애겠다는 의미 SPA가 아니면 굳이 써줄 필요는 없음
// SPA 싱글페이지 어플리케이션. react, vue

// 수정한 nignx 문법에 오류가 있는지 확인
// sudo nginx -t

// nginx 재실행
// sudo service nginx restart

// 탄력적 ip 주소를 도메인으로 교체
// 가비아에서 도메인을 구입

// aws route 53 사용
// DNS 레코드는 도메인의 이름과 관련된 정보를 나타내는 데이터
// NS 네임서버 인터넷에서 도메인을 아이피 주소로 변환하는 역활

// 레코드 추가
// A 레코드 : 도메인 이름을 IPv4 주소로 매핑
// A 레코드에 탄력적 IP 작성

// CNAME 레코드 : 서브도메인 결정

// https 설정
// 인증서를 발급받아 인증을 요청
// 배포한 서버에 https를 설정해서 보안 이슈 해결
// 모질라에서 인증서 받음
// 3개월짜리 무료 인증서 발급(3개월 마다 재발급 받아서 무료로 사용가능)

// certbot을 사용하여 https 설정
// certbot이 3개월마다 알아서 재발급 받고 메일로 알려줌

// sudo snap install core
// sudo snap refresh core
// sudo snap install --classic certbot

// nginx 관련 certbot 실행
// sudo certbot --nginx

// nginx default 수정
//  46         server_name [도메인명];
// sudo niginx -t

// nignx 재시작
// sudo service nginx restart

// 3개월 마다 인증서 재발급
// sudo certbot renew

// 실제로 인증서를 갱신하지 않고 인증서 발급 테스트
// sudo certbot renew --dry-run
