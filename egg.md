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

# 运行环境
## 指定方式：
1. 配置文件 config/env
2. 环境变量 EGG_SERVER_ENV

## 获取当前环境配置: 
  `app.config.env`

## 题外
  Node -> NODE_ENV -> process.env.NODE_ENV
  Koa -> app.env -> 

⚠️: ctx.body <==> ctx.response.body 而不是ctx.request.body