const { userInit, userInsert, userSelect } = require("./usersModel");

userInit();

module.exports = { userInsert, userSelect };
