const { DataTypes, Model } = require("sequelize");

class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        ment: {
          type: DataTypes.STRING(100),
        },
        user_id: {
          type: DataTypes.STRING(20),
        },
      },
      {
        sequelize,
        underscored: false,
        modelName: "Comment",
        tableName: "total_comments",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static join(db) {
    db.Comment.belongsTo(db.Board, { foreignKey: "BoardId", targetKey: "id" });
  }
}

module.exports = Comment;
