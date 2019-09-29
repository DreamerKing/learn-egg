# 特性 
+ 基于Koa封装的企业级Web框架
+ 插件机制，可扩展性
+ 约定优于配置
+ 内置多线程管理

# 框架比较
+ Koa
+ Express
+ Sails
+ Egg

异步处理解决方案演进
1. 回调
2. 迭代器／事件队列
3. Promise
4. 生成器
5. async/await


扩展
app/extend/{application, context, request, response}.js

Koa插件
koa-compress 
koa-session
koa-bodyparser


Express插件
compression

Egg插件
egg-security
egg-view-nunjucks
egg-multipart
egg-userrole

+ extend 扩展基础对象上下文，提供各种工具类、属性
+ middleware  提供请求的前置、后置逻辑
+ config 配置各各环境插件自身的默认配置


Egg的版本
+ 1.x  generator function  koa v1  node v6
+ 2.x  async function koa v2 node v8

脚手架
```sh
npm init --type=simple
npm i
npm run dev
```

手动创建
```sh
yarn add egg
yarn add egg-bin --save-dev
```

# 目录结构 
```md
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js  路由规则
│   ├── controller  控制层
│   |   └── home.js
│   ├── service (可选) 服务层(业务逻辑层)
│   |   └── user.js
|   ├── model (可选) 数据模型层
│   |   └── user.js
│   ├── middleware (可选) 中间件
│   |   └── response_time.js
│   ├── schedule (可选) 定时任务
│   |   └── my_task.js
│   ├── public (可选)  静态资源
│   |   └── reset.css
│   ├── view (可选) 模版文件
│   |   └── home.tpl
│   └── extend (可选) 框架扩展
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config 配置
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test 测试用例
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

必要目录文件
+ package.json
+ router
  
内置对象
+ 继承对象: 
  + Application 只实例化一次
    + 事件
      + server
      + error
      + request
      + response
    + 获取方式
      + this.app
      + this.ctx.app
  + Context 每次请求实例化一次
    + 获取方式
      + this.ctx Controller/Service/Middleware
      + Application.createAnonymousContext() 非请求情况下
  + Request
    + ctx.request
    + params
    + query
    + body
    + method
    + url
    + path
    + querystring
    + search
  + Response
    + ctx.response
    + status
    + body
+ 扩展对象:
  + Controller
    + ctx
    + app
    + config
    + service
    + logger
  + Service 业务逻辑下沉为服务
  + Helper utility函数 有与Controller基类一样的属性
    + ctx.helper
  + Config
    + app.config
    + this.config (Controller/Service/Helper)
  + Logger
    + debug()
    + info()
    + warn()
    + error()
    + App Logger
    + App CoreLogger
    + Context Logger
    + Context CoreLogger
    + Controller Logger
    + Service Logger
  + Subsscription
⚠️: ctx.body <==> ctx.response.body 而不是ctx.request.body

# 运行环境
## 指定方式：
1. 配置文件 config/env
2. 环境变量 EGG_SERVER_ENV

## 获取当前环境配置: 
  `app.config.env`

## 题外
  Node -> NODE_ENV -> process.env.NODE_ENV
  Koa -> app.env -> 

# Config
1. 自动合并配置 extend2
2. 按序覆盖 加载顺序(default -> prod/dev, 插件 -> 框架 -> 应用) 
3. 支持多环境配置
写法:
1. 配置对象
2. 配置函数

查看: 
this.app.config

# 中间件 (洋葱圈模型)
1. 应用中使用插件通过配置文件的middleware配置(app.config.middleware)
2. 框架(app.config.coreAppMiddleware)或插件中使用中间件
3. 路由 

配置
+ enable
+ match
+ ignore 

match/ignore 支持
+ 字符串
+ 正则
+ 函数

# 路由 
集中化管理
路由配置
router.verb('path-match', app.controller.action);
router.verb('router-name', 'path-match', app.controller.action);
router.verb('path-match', middleware1, ..., middlewareN, app.controller.action);
router.verb('router-name', 'path-match', middleware1, ..., middlewareN, app.controller.action);
app.resources('routerName', 'pathMatch', controller)
+ verb  
  + head
  + options
  + get
  + put
  + post
  + patch
  + delete/del
  + redirect
+ router-name 路由别名
+ path-match 匹配的路径
+ middleware 中间件
+ controller controller action
  + app.controller.usr.action
  + 'usr.action'