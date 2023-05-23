const { DataTypes, Model } = require("sequelize");

class Board extends Model {
  static init(sequelize) {
    return super.init(
      {
        msg: {
          type: DataTypes.TEXT,
        },
        user_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: false,
        modelName: "Board",
        tableName: "total_boards",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static join(db) {
    db.Board.belongsTo(db.User, { targetKey: "id" });
    db.Board.hasMany(db.Comment, { foreignKey: "BoardId", sourceKey: "id" });
  }
}

module.exports = Board;
