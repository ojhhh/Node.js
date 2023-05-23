const { DataTypes, Model } = require("sequelize");

class Admin extends Model {
  static init(sequelize) {
    return super.init(
      {
        admin_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        admin_pw: {
          type: DataTypes.STRING(64),
        },
        lv: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        underscored: false,
        modelName: "Admin",
        tableName: "total_admin",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Admin;
