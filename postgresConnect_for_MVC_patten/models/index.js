const Sequelize = require("sequelize");
const config = require("../config");
const Trading = require("./trading");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};

db.sequelize = sequelize;
db.Trading = Trading;

Trading.init(sequelize);

module.exports = db;
