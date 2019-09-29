const { Controller }  = require('egg');

class NeedGzipController extends Controller {
    async needgzip() {
        this.ctx.body = {
            data: "在应用中，我们可以完全通过配置来加载自定义的中间件，并决定它们的顺序。"
        }
    }
}

module.exports = NeedGzipController;

