# API文档

## express()

创建一个 Express 应用，`express()` 是一个由 ***express*** 模块导出的入口（top-level）函数。

```js
const express = require('express');
const app = express();
```

### 内置方法

#### `express.static(root, [options])`

express.static 是 Express 内置的唯一一个中间件。是基于 serve-static 开发的，负责托管 Express 应用内的静态资源。[详情参数查看](./guide.md#内置中间件)

## 应用

app 对象一般用来表示 Express 程序。通过调用 Express 模块导出的顶层的 `express()` 方法来创建它:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world')
});

app.listen(3000)
```

该app对象具有用于：
* 路由 HTTP 请求
* 配置中间件
* 渲染 HTML 视图
* 注册模板引擎


API 方法的具体细节[查看](https://www.runoob.com/w3cnote/express-4-x-api.html)
