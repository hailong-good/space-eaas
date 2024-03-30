const Controller = require("egg").Controller;
const axios = require("axios");
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

  // 微信登陆
  async wxLogin() {
    const { ctx, app } = this;
    const { code } = ctx.query;
    const APPID = 'wx8f1631d795e91048';
    const APPSECRET = '40f1c654a1efc7f938a5710aee1b7183';
    const LOGIN_URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${code}&grant_type=authorization_code`;

    if (!code) {
      return (ctx.body = { code: 500, msg: "code不能为空" });
    }
    try {
      const { data } = await axios.get(LOGIN_URL);
      const { session_key, openid } = data;
      console.log(session_key, openid, code)
      if (!session_key || !openid) return ctx.body = { code: 500, msg: "微信登陆失败" }
      // 查找数据库是否有这个字段
      const selectUser =
        (await app.mysql.query(
          `SELECT * FROM user WHERE openid = '${openid}' LIMIT 1;`
        )) || [];
      // 表示数据库没有此用户
      if (selectUser.length === 0) {
        app.mysql.query(
          `insert into user(nickname, openid, session_key) values('微信用户', '${openid}', '${session_key}')`
        )
      }
      const selectItem = selectUser[0] || {};

      return ctx.body = { code: 200, data: { ...selectItem, session_key, openid } }
    } catch (error) {
      console.log('请求失败')
    }
    console.log('code: ', code);
    ctx.body = { code: 200, msg: "微信登陆成功" }
  }
  
}

module.exports = HomeController;
