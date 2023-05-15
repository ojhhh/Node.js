const {
  userInit,
  userList,
  userSelect,
  userInsert,
  userPwUpdate,
  userDelete,
  userRefresh,
} = require("./usersModel");

userInit();

// async function test() {
//   userDelete("aaa");
// }

// test();

module.exports = {
  userList,
  userSelect,
  userInsert,
  userPwUpdate,
  userDelete,
  userRefresh,
};
