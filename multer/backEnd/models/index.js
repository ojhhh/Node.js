const config = require("../config");
const Sequelize = require("sequelize");

const seq = new Sequelize(config.dev);

const User = require("./users");

User.init(seq);

const db = {};

db.sequelize = seq;
db.User = User;

module.exports = db;
