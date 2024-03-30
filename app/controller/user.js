const { paramsToSql } = require("../utils/index") ;
const Controller = require("egg").Controller;
const axios = require("axios");
const jwt = require("jsonwebtoken");


class HomeController extends Controller {
    // 获取用户信息
    async getUser() {
        const { ctx, app } = this;
        console.log(ctx.request, ctx.request.body);
        const { header } = ctx.request;
        const { openid } = header;
        try {
            const result = await app.mysql.query(`SELECT * FROM user WHERE openid = ?`, [openid]) || [];
            console.log(result);

            if (result.length > 0) {
                return ctx.body = { code: 200, data: result[0] }
            }
        } catch (error) {

        }

        ctx.body = { code: 200, msg: "获取成功" }
    }

    // 修改用户资料
    async setUser() {
        const { ctx, app } = this;
        // console.log(ctx.request, ctx.request.body);
        const { header, body } = ctx.request;
        const { openid } = header;
        const { avatarUrl = null, nickname = null, phone = null } = body
        const sql = paramsToSql({ picture: avatarUrl, nickname, phone });

        console.log(`UPDATE user SET ${sql} WHERE openid = ${openid}`);
        try {
            const res = await app.mysql.query(`UPDATE user SET ${sql} WHERE openid = ?`, [openid]);
            // console.log(res);
            // `UPDATE user SET picture = ?, nickname = ?, phone = ? WHERE openid = ?`
        } catch (error) {

        }

        ctx.body = { code: 200, body: "修改成功" }
    }


}

module.exports = HomeController;
