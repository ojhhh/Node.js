const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 컬럼의 내용
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.STRING(20),
        },
        user_pw: {
          type: Sequelize.STRING(64),
        },
      },
      {
        // 테이블의 내용
        // timestamps : 생서 시간, 업데이트 시간 자동 생성
        // underscored : 카멜 케이스 설정
        // paranoid : 삭제 시간 생성
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "orm_users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foriegnKey: "user_id", sourceKey: "id" });
  }
}

module.exports = User;
