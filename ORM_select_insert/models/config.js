// dialect 사용할 데이터 베이스
const config = {
  dev: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
  },
};

module.exports = config;
