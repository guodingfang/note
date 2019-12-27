# koa2 介绍

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造，致力于成为 web 应用 和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。

Koa 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力的增强错误处理。

Koa 并没有绑定任何中间件，而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

## 安装

Koa 依赖 node v7.6.0 或 ES2015 及更高版本和 async 方法支持。

```
$ npm i koa
$ npm i --save koa
```

安装骨架(skeleton)生成器

```
npm i -g koa-generator
```

创建一个应用

```
koa2 first-koa
```

> 注意 koa 与 koa2 是两个不同的命令，使用 koa 会创建 koa1 骨架项目。koa1 与 koa2 最大的区别就是 koa1 使用 generator，而 koa2 使用 async/await。

## koa2 的优势

### express

虽然 Express 的 API 很简单，但是它是基于 ES5 的语法，要实现异步代码，只有一个方法：回调。如果异步嵌套层次过多，代码写起来就非常难看：

```js
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/test', function (req, res) {
  fs.readFile('/file1', function (err, data) {
    if (err) {
      res.status(500).send('read file1 error');
    }
    fs.readFile('/file2', function (err, data) {
      if (err) {
        res.status(500).send('read file2 error');
      }
      res.type('text/plain');
      res.send(data);
    });
  });
});
```

### koa 1.0

随着新版的 Node.js 开始支持 ES6，Express 的团队又基于 ES6 的 generator 重新编写了一下代的 web 框架 koa。和 Express 相比，koa 1.0 使用 generator 实现异步，这使得代码看起来非常像同步的：

```js
const koa = require('koa');
const app = koa();

app.use('/test', function *() {
  const data1 = yield doReadFile1();
  const data2 = yield doReadFile2();
  this.body = {
    data1,
    data2
  }
});
```

### koa 2.0

随着 ES7 引入了新的语法糖 async 和 await，JavaScript 未来标准的异步代码是这样的：

```js
const fs = require('fs')
const f = async () => {
  const data = await fs.read('/file1');
};
app.listen(3000);
```

koa 团队并没有止步于 koa 1.0，他们非常超前地基于 ES7 开发了 koa2。koa2 的代码看上去像这样：

```js
const koa = require('koa');
const app = koa();

app.use(async (ctx, next) => {
  await next();
  const data = await doReadFile();
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
app.listen(3000);
```

