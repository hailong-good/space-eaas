const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");

class HomeController extends Controller {
  // 注册
  async register() {
    const { ctx, app } = this;
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
      ctx.body = { code: 500, msg: "用户名已存在" };
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
  // 登陆
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body || {};
    if (!username || !password)
      return (ctx.body = { code: 500, msg: "请输入用户名密码" });
    const payload = {
      userName: username,
      passWord: password,
    };

    const secretKey = "yourSecretKey";
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    ctx.body = {
      code: 200,
      msg: "登陆成功",
      token,
    };
  }
  // 验证token
  async verifyToken() {
    const { ctx, app } = this;
    const { token } = ctx.query;

    try {
      const decoded = jwt.verify(token, "yourSecretKey");

      console.log("\n\n\n\n", decoded);
      return (ctx.body = decoded);
    } catch (err) {
      return (ctx.body = { status: false, msg: "验证失败" });
    }
  }
}

module.exports = HomeController;
