const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    this.db;
    this.ctx.body = 'Hello world';
    // this.ctx.body = ctx.response
    console.log('\n\n\n\n\n\n\n\n',await app.mysql.query('SELECT * FROM users;'));
  }
}

module.exports = HomeController;