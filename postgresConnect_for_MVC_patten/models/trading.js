const Sequelize = require("sequelize");

class Trading extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        price: {
          type: Sequelize.STRING,
          defaultValue: 0,
        },
        cnt: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "trading",
        tableName: "test_tradings",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Trading;
