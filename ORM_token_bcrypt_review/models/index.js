const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.dev);

const User = require("./users");
const Board = require("./boards");
const Comment = require("./comments");
const Admin = require("./admin");

User.init(sequelize);
Board.init(sequelize);
Comment.init(sequelize);
Admin.init(sequelize);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Board = Board;
db.Comment = Comment;
db.Admin = Admin;

User.join(db);
Board.join(db);
Comment.join(db);

module.exports = db;
