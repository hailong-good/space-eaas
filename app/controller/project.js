const Controller = require('egg').Controller;

class projectController extends Controller {
  async list() {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.query(`SELECT * FROM project`) || [];
      return ctx.body = { code: 200, data: result };
    } catch (error) {

    }
    console.log(result);
    ctx.body = { code: 200, msg: "获取成功" }
  }
  // 获取详情
  async detail() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    if (!id) return ctx.body = { code: 400, msg: "id不能为空" }
    try {
      const result = await app.mysql.get('project', { id: id });
      console.log(result);
      return ctx.body = { code: 200, data: result }
    } catch (error) {

    }
    ctx.body = { code: 200, msg: "获取成功" }
  }
}

module.exports = projectController;