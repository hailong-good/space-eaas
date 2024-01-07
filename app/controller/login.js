const Controller = require("egg").Controller;

class HomeController extends Controller {
  async register() {
    const { ctx, app } = this;
    this.db;
    // 获取参数
    const reqParam = ctx.request.body || {};
    // 检查数据库有没有存在重复的用户
    const selectUser =
      (await app.mysql.query(
        `SELECT * FROM users WHERE username LIKE '%${reqParam.userName}%';`
      )) || [];
    // 没有存在相同用户
    if (selectUser.length === 0) {
      app.mysql.query(
        `INSERT INTO users (id,username, password) VALUES (999,'${reqParam.userName}', '${reqParam.password}');`
      );
      console.log(
        "\n\n\n\n\n\n\n\n",
        await app.mysql.query("SELECT * FROM users;")
      );
      return (ctx.body = { code: 200, msg: "注册成功" });
    } else {
      // 有相同用户存在
       (ctx.body = { code: 500, msg: "用户名已存在" });
    }
    console.log(
        "\n\n\n\n\n\n\n\n",
        await app.mysql.query("SELECT * FROM users;")
      );
    // console.log(
    //   "\n\n\n\n\n\n\n",
    //   ctx.request.body,
    //   "\n\n\n\n\n\n\n",
    //   selectUser.length
    // );
  }
}

module.exports = HomeController;
