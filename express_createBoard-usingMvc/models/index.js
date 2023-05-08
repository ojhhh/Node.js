// 여러개의 모듈 내보내기

// posts.js에서 내보낸 객채를 가져오기
const posts = require("./posts");
// 가져온 posts.js의 객체 확인
console.log(posts);

// users.js에서 내보낸 객채를 가져오기
const user = require("./users");

module.exports = { posts, user };
