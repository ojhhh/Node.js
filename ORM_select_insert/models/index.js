const Sequelize = require("sequelize");
const config = require("./config");
const User = require("./users");
const Post = require("./post");

// 시퀄라이즈 객체 생성
// 궁금증 : 데이터베이스의 이름, 계정, 비밀번호를 넘겨줬는데 왜 config.dev로 객체 전체를 넘겨 줬을까 데이터베이스의 이름 계정 비밀번호가 중복으로 들어갔을탠데
// -> 중복으로 들어간게 맞지만 sequelize에서 중복되었기 때문에 무시한다고 함
// -> host, dialect 등 옵션을 전달하기 위해 한거 같음
// -> 이렇게 쓰게 되면 다른 개발자가 혼동을 할 수 도 있으니 구조분해를 해서 간결하게 해주는게 더 좋다고함
// -> const { database, username, password, ...options } = require("./config");
// const sequelize = new Sequelize(database, username, password, options ); 이런식으로
const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

// 내보내줄 빈 객체
const db = {};
db.Sequelize = sequelize;
// 테이블 초기화
db.User = User;
// 게시판 만들기
db.Post = Post;

// users, post 테이블 만들기
// 데이터베이스의 이름, 계정, 패스워드를 담은 객체를 매개변수로 전달
// -> init에서 최초로 User를 실행해서 Sequelize.Model의 클래스를 User가 상속받음
User.init(sequelize);
Post.init(sequelize);

// 관계형 선언
// user.js post.js에서 한 static 메소드에 db 매개변수 전달
User.associate(db);
Post.associate(db);

module.exports = db;
