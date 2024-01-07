exports.keys = "xuhailong";

exports.mysql = {
  client: {
    host: "124.221.219.179", // 连接的数据库主机地址
    port: 3306, // 数据库端口号
    user: "root", // 数据库用户名
    password: "xu2297040028", // 数据库密码
    database: "space-eaas", // 数据库名
  },
  app: true,
  agent: false,
};
// 解决csrf报错问题
exports.security = {
  csrf: {
    enable: false,
  },
};
// 解决跨域
exports.cors = {
  origin: "*",
  allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
};
