# Express 介绍

Express 是基于 Node.js 平台，快速、开放、极简的 web 开发框架


## 安装

```
$ npm install express --save
$ yarn add express
```

## Express 生成器

通过应用生成器工具 express 可以快速创建一个应用的骨架。

通过如下命令安装：

```
$ npm install express-generator -g
```

`-h` 选项可以列出所有可用的命令行选项：

```
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

然后安装所有依赖包：

```
$ cd myapp 
$ npm install
```

启动服务

```
$ yarn start
```

## 简单的 Express 路由

对 Express 路由做一个简单的介绍，路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST等）组成的，涉及到的应用如何响应客户端对某个网站节点的访问。

每一个路由都可以有一个或多个处理器函数，当匹配到路由时，这个/些函数将被执行。

路由的定义由如下结构组成：`app.METHOD(PATH, HANDLER)`。其中，`app` 是一个 express 实例；`METHOD` 是某个 HTTP 请求方式中的一个；`PATH` 是服务器端的路径；`HANDLER` 是当路由匹配到时需要执行的函数。

```js
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```

## 利用 Express 托管静态文件

通过 Express 内置的 `express.static` 可以方便的托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 `express.static` 中间件就可以提供静态资源文件的访问了。例如，假设在 `public` 目录放置了图片、CSS 和 JavaScript 文件，就可以：

```js
app.use(express.static('public'));
```

现在，public 目录下面的文件就可以访问了。

```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

如果你的静态资源存放在多个目录下面，你可以多次调用 `express.static` 中间件：

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

如果你希望所有通过 `express.static` 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

```js
app.use('/static', express.static('public'));
```

现在，你就爱可以通过带有 `/static` 前缀的地址来访问 public 目录下面的文件了。

```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

## Express 常见问题

#### 如何定义模型（model）？

Express自身并不感知数据库是否存在。数据库功能依赖于第三方 Node 模块提供的接口。

#### Express 支持哪些模板引擎？

Express 支持任何符合 (path, locals, callback) 接口规范的模板引擎。

#### 如何处理 404 ？

在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。这是因为 404 只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件。如下：

```js
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
```

#### 如何设置一个错误处理器？

错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 (err, req, res, next)：

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
