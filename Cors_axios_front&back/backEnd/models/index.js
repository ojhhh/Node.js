const Sequelize = require("sequelize");
const config = require("../config");
const User = require("../models/users");
const Post = require("../models/posts");

// 순서가 중요하는데 확인해봐야함
const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);

User.join(db);
Post.join(db);

module.exports = db;
