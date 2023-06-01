// 호스팅
// 웹 호스팅 : 서버의 일부 공간을 임대하는 개념
// 서버 호스팅 : 물리 서버를 단독으로 임대 및 구매
// 웹 호스팅의 장점 : 서버나 인프라 구축이 필요 없고 비용이 저렴
// 웹 호스팅의 단점 : 웹 호시팅은 단독서버에 비해 사용량이 제한적

// aws 웹서비스를 통한 서버 배포
// Iaas : 컴퓨터 자원만 제공하는 형태
// Paas : 기존 플랫폼 환경에서 서비스를 올려주는 형태

// 생성한 aws 서버에 mysql 설치 (Ubuntu 사용)
// sudo apt-get update
// sudo apt-get install mysql-server
// sudo mysql -uroot -p

// 데이터베이스 세팅
// create database test;
// 데이터베이스 확인
// show databases;
// 데이터베이스 사용
// 데이터베이스 유저 생성
// create user '[유저이름]'@'%' identified by [유저비밀번호];
// 예) create user 'admin'@'%' identified by 'admin1234';
// 만든 유저에게 권한 설정
// grant all on [데이터베이스 이름].* to [권한을 할당할 유저 이름]'@''%';
// 예) grant all on test.* to 'admin'@'%';
// 권한 확인
// show grants for [유저이름];
// 예) show grants for 'admin';

// 외부 mysql에 접속
// sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
// bind-address -> 0.0.0.0으로 변경

// git에 올린 프로젝트를 설치

// nodejs설치
// sudo apt-get update
// sudo apt-get install -y build-essential
// sudo apt-get install curl
// 원하는 노드 버전 선택 방법
// curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash --

// nodejs 설치
// sudo apt-get install -y nodejs

// node 버전 확인
// node -v
// npm 버전 확인
// npm -v

// 포트 포워딩
// --dport 80 접속 했을때 --to-port 8080 포트로 포워딩
// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
// 포트 포워딩 확인 명령어
// sudo iptables -t nat -L --line-numbers
// 포트 포워딩 삭제 명령어
// sudo iptables -t nat -D PREROUTING [인덱스번호]

// 백그라운드에서 서버 대기
// pm2 설치
// npm install pm2
// package.json 부분에서 실행 스크립트 수정
// start 부분 "node app.js" -> "pm2 start app.js" 로 수정
// 종료하는 방법
// npx pm2 kill
// 서버 리스트 확인
// npx pm2 list
