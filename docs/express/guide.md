# 使用指南

## 路由

### 路由方法

路由方法源于 HTTP 请求，和 express 实例相关联。

下面这个例子展示了为应用跟路径定义的 GET 和 POST 请求：

```js
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
```

`app.all()` 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。

```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```

### 路由路径

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

```js
/**
* 使用字符串的路由路径示例：
* 匹配 /about 路径的请求
*/
app.get('/about', function (req, res) {
  res.send('about');
});

/**
* 使用字符串模式的路由路径示例：
* 匹配 abcd、abbcd、abbbcd等
*/
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

/**
* 使用正则表达式的路由路径示例：
* 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
*/
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

### 路由句柄

可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 `next(route)` 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示：

```js
/**
* 使用一个回调函数处理路由：
*/
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});

/**
* 使用回调函数数组处理路由：
*/
const cb0 = (req, res, next) => {
  console.log('CB0');
  next();
};

const cb1 = (req, res, next) => {
  console.log('CB1');
  next();
};

const cb2 = (req, res) => {
  res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);


/**
* 混合使用函数和函数数组处理路由：
*/
const cb3 = (req, res, next) => {
  console.log('CB3');
  next();
};

const cb4 = (req, res, next) => {
  console.log('CB4');
  next();
};

app.get('/example/d', [cb3, cb4], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
```

### 响应方法

下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

| 方法 | 描述 |
| --- | --- |
| `res.download()` | 提示下载文件 |
| `res.end()` | 终结响应处理流程 |
| `res.json()` | 	发送一个 JSON 格式的响应 |
| `res.jsonp()` | 发送一个支持 JSONP 的 JSONP 格式的响应 |
| `res.redirect()` | 重定向请求 |
| `res.render()` | 渲染视图模板 |
| `res.send()` | 发送各种类型的响应 |
| `res.sendFile` | 以八位字节流的形式发送文件 |
| `res.sendStatus()` | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送 |


#### app.route()

可使用 `app.route()` 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

下面这个示例程序使用 `app.route()` 定义了链式路由句柄。

```js
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```

#### express.Router

可使用 `express.Router` 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

在 app 目录下创建名为 birds.js 的文件，内容如下：

```js
const express = require('express');
const router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
```

然后在应用中加载路由模块：

```js
var birds = require('./birds');
// ...
app.use('/birds', birds);
```

应用即可处理发自 `/birds` 和 `/birds/about` 的请求，并且调用为该路由指定的 timeLog 中间件。

## 使用中间件

Express 是一个自身功能极简，完全是由路由和中间层构成的一个 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

**中间件（Middleware）** 是一个函数，他可以访问请求对象（request object(req)），响应对象（response object(res)），和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

#### 中间件的功能包括：
* 执行任何代码
* 修改请求和响应对象
* 终结请求-响应循环
* 调用堆栈中的下一个中间件

如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

#### Express 应用可使用如下几种中间件：
* 应用级中间件
* 路由级中间件
* 错误处理中间件
* 内置中间件
* 第三方中间件

### 应用级中间件

应用级中间件绑定到 `app 对象` 使用 app.use() 和 app.METHOD()，其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：

```js
const app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

### 路由级中间件

路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。

```js
const router = express.Router();
```

路由级使用 router.use() 或 router.VERB() 加载。

上述在应用级创建的中间件系统，可通过如下代码改写为路由级：

```js
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// 将路由挂载至应用
app.use('/', router);
```

### 错误处理中间件

> 错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### 内置中间件

`express.static(root, [options])`

express.static 是 Express 唯一内置的中间件。

参数 root 指提供静态资源的根目录。

可选的 options 参数拥有如下属性。

| 属性 | 描述 | 类型 | 缺省值 |
| --- | --- | --- | --- |
| dotfiles | 是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore” |	String | “ignore” |
| etag | 是否启用 etag 生成	| Boolean	| true |
| extensions | 设置文件扩展名备份选项 | 	Array	| [] |
| index | 发送目录索引文件，设置为 false 禁用目录索引。	| Mixed	| “index.html” |
| lastModified | 设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。 | Boolean | true |
| maxAge | 以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。	 | Number | 0 |
| redirect | 当路径为目录时，重定向至 “/”。	 | Boolean	| true |
| setHeaders | 设置 HTTP 头以提供文件的函数。	| Function | |

### 第三方中间件

通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

```
$ npm install cookie-parser
```

```js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());
```

## 在 Express 中使用模板引擎

需要在应用中进行如下设置才能让 Express 渲染模板文件：
* views, 放模板文件的目录，比如： app.set('views', './views')
* view engine, 模板引擎，比如： app.set('view engine', 'jade')

然后安装相应的模板引擎 npm 软件包。

```
$ npm install jade --save
```

> 和 Express 兼容的模板引擎，比如 Jade，通过 res.render() 调用其导出方法 __express(filePath, options, callback) 渲染模板。
>
> 有一些模板引擎不遵循这种约定，Consolidate.js 能将 Node 中所有流行的模板引擎映射为这种约定，这样就可以和 Express 无缝衔接。

一旦 view engine 设置成功，就不需要显式指定引擎，或者在应用中加载模板引擎模块，Express 已经在内部加载，如下所示。

```js
app.set('view engine', 'jade');
```

在 views 目录下生成名为 index.jade 的 Jade 模板文件，内容如下：

```
html
  head
    title!= title
  body
    h1!= message
```

然后创建一个路由渲染 index.jade 文件。如果没有设置 view engine，您需要指明视图文件的后缀，否则就会遗漏它。

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

此时向主页发送请求，“index.jade” 会被渲染为 HTML。
