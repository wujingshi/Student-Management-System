# 学生管理系统
    用node+mongodb+express写的学生管理系统

## 说明
    刚开始自学node.js，发现挺奇妙的，但是对于部分后台响应处理还是有点不是很懂，继续努力吧。
    
## 项目开发步骤
    
### 搭建项目基本结构
        ----根目录
            src
                app.js 项目入口文件，可以使用node app.js进行运行
                routers 项目所需路由存放的文件夹
                controllers 控制器存放的文件夹（业务逻辑性）
                statics 静态资源根目录（bootstrap、jQuery）
                tools 工具类所在文件夹
                views 存放html页面文件夹
            package.json 项目项目文件
### 登录模块
        1.获取页面
        新建一个和账号相关的路由 accountRouter 并写好代码
        在入口文件中，使用中间件形式，实现分流
        在控制器中设置登录模块读取页面的功能，并读取login.html返回给浏览器
        设置中间件处理静态资源
        2.设置验证码功能
        通过captchapng插件进行验证码处理
        3.登录功能
            通过express-session插件进行对验证码的临时存储和单一用户的验证
            使用ajax进行post请求登录，后台进行接收，并将验证码和session中的验证码比对
            通过mongodb插件设置链接数据库获取db对象
## 其他功能持续设计中……


## 题外话
    希望这个项目能给予跟我一样初学node.js帮助。node.js的功能还是挺强大，同时mongodb相对于其他数据库来说，感觉略微简单，一起努力吧!
