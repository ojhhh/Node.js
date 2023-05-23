const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        user_pw: {
          type: DataTypes.STRING(64),
        },
        lv: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        underscored: false,
        modelName: "User",
        tableName: "total_users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static join(db) {
    db.User.hasMany(db.Board, { sourceKey: "id" });
  }
}

module.exports = User;
