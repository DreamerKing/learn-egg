const  { Controller }  = require('egg');

class UserController extends Controller {
    async info(){
        const { ctx } = this;
        ctx.body = {
            message: `hi ${ctx.params.name}`
        }
    }
}

module.exports = UserController;