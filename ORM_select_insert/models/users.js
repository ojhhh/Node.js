const Sequelize = require("sequelize");

// User 클래스에 sequelize안의 model 클래스를 상속
class User extends Sequelize.Model {
  static init(sequelize) {
    // super.init() 상속 받은 부모의 함수를 실행
    // init 메소드
    // 첫번째 매개변수 : 컬럼에 대한 설정 값
    // 두번째 매개변수 : 테이블의 자체 설정 값
    return super.init(
      {
        // 컬럼 설정

        // sequelize는 모델을 정의 할때 별도로 id 필드를 만들지 않으면 자동으로 primary key를 갖는 id 컬럼을 생성
        // VARCHAR == STRING
        // allowNull : null 허용 여부
        // primaryKey : 기본키 설정 여부
        // unique : 고유키(중복되지 않음) 사용 여부
        // type: Sequelize.STRING, 선언할때 보통 require해서 sequelize를 가져올때 구조분해 해서 Datatypes을 가져와서 쓰던데 여긴 이렇게 써도 동작하는 원리가 뭐지?
        // -> type: Sequelize.STRING과 Datetypes를 구조 분해해서 type: Datetypes.STRING을 사용하는 방법 둘다 맞는 방법
        // STRING으로 선언하면 VARCAHR(255)로 만들어짐
        // VARCHAR의 경우 1 ~ 65535 선택할 수 있지만 TEXT 타입의 경우 무조건 65535 고정
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        msg: {
          type: Sequelize.TEXT,
        },
      },
      {
        // 테이블 설정
        // 매개변수로 전달 받은 sequelize 작성

        // timestamps : 테이블에 row을 추가 했을때 생성 시간과 업데이트 시간을 표기
        // created_at과 updated_at 이라는 컬럼이 자동으로 추가
        // row추가 했을때 시간을 기록해주고 수정했을때도 시간을 기록 해줌

        // underscored : 기본 표기법은 스네이크 표기법으로 되어 있지만 표기법을 카멜 표기법으로 바꿈 created_at -> createdAt
        // modelName : 모듈의 이름을 설정 (데이터 주고 받을때 사용)
        // tableName : 테이블 이름
        // paranoid : true로 설정하면 deleted_at이라는 컬럼 생성 row를 삭제 해도 데이터는 남아있고 맨 뒤에 삭제한 시간이 남게됨
        // charset : 인코딩 방식 설정
        // collate : 인코딩 방식 설정
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "orm_users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // 관계형 데이터베이스 만들기
  // 1 대 N 관계
  // sequelize에서 1:N 관게를 hasMany로 테이블의 관계 정의
  // sourceKey : user테이블 안에 어떤 키를 foreignKey와 연결 할지 선언
  //
  // static associate(db) {
  //   db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "id" });
  // }
}

module.exports = User;
