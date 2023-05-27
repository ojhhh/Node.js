const Sequelize = require("sequelize");
// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("./index").sequelize;
// const User = require("./users");

class Post extends Sequelize.Model {
  static init(sequelize) {
    // 첫번째 매개변수 : 컬럼
    // 두번째 매개변수 : 내용
    return super.init(
      {
        msg: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Post",
        tableName: "orm_post",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  // belongsTo 메소드를 사용해서 user에 id를 forenignKey로 연결
  // 유저의 id가 따라갈 키 참조키는 user_id
  // foreignKey 생성시 별도의 이름을 정하지 않아도 modelName + primarykey 조합으로 컬럼이 생성됨
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
  }
}

module.exports = Post;
