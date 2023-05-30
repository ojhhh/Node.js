const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static init(seq) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        user_pw: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        img: {
          type: DataTypes.STRING(100),
        },
      },
      {
        sequelize: seq,
        underscored: false,
        modelName: "User",
        tableName: "upload_users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = User;
