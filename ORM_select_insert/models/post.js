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
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
  }
}
// class Post extends Model {}

// Post.init(
//   {
//     msg: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: User,
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: "Post",
//     tableName: "orm_post",
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );

// Post.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
// User.hasMany(Post, { foreignKey: "user_id", sourceKey: "id" });

module.exports = Post;
