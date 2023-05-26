const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config");

class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(100),
        },
        writer: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Post",
        tableName: "cors_posts",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static join(db) {
    db.Post.belongsTo(db.User, { targetKey: "id" });
  }
}

module.exports = Post;
