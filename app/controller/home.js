const  { Controller }  = require('egg');

class HomeController extends Controller {
    async index() {
        console.log("config -> ", this.app.config);
        
        this.ctx.body = 'Hello Egg2!';
    }
}

module.exports = HomeController;