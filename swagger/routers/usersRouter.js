const router = require("express").Router();
const users = [
  { id: "test1", pw: "test1", nickname: "test1" },
  { id: "test2", pw: "test2", nickname: "test2" },
  { id: "test3", pw: "test3", nickname: "test3" },
  { id: "test4", pw: "test4", nickname: "test4" },
  { id: "test5", pw: "test5", nickname: "test5" },
];
/**
 * @swagger
 * paths:
 *  /user/nickname:
 *   post:
 *    tags:
 *    - user
 *    description: 닉네임 조회
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        id:
 *         type: string
 *        pw:
 *         type: string
 *
 *    responses:
 *     200:
 *      description: 닉네임 조회 성공
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *     401:
 *      description: 닉네임 조회 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */

// 닉네임 조회에 대한 swagger
router.post("/nickname", async (req, res, next) => {
  try {
    for (var i = 0; i < users.length; i++) {
      if (req.body.id == users[i].id) {
        if (req.body.pw == users[i].pw) {
          return res.status(200).json({
            message: "닉네임 : " + users[i].nickname,
          });
        } else {
          return res.status(401).json({
            message: "비밀번호가 틀렸습니다!",
          });
        }
      }
    }
    return res.status(401).json({
      messge: "아이디가 존재하지 않습니다!",
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

module.exports = router;
