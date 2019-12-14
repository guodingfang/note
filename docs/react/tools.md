# React 构建工具

## create-react-app


create-react-app [具体详情](https://www.html.cn/create-react-app/)

## create-react-app 项目配置

::: tip
不需要暴漏eject配置项
:::

### `react-app-rewired` && `customize-cra`

* react-app-rewired：react 社区开源的一个修改 CRA（create-react-app 的缩写） 配置的工具，
例如扩展 Create React App 的 Webpack 配置

* customize-cra：提供了一组用于自定义利用 react-app-rewired 核心功能的 Create React App v2 配置, 可以通过 config-overrides.js 文件来对 webpack 配置进行扩展

### 基本使用

#### 1.安装 `react-app-rewired` 和 `customize-cra`

```
// 安装react-app-rewired
yarn add react-app-rewired --dev

// 安装customize-cra
yarn add customize-cra --dev
```

#### 2.修改 package.json 文件

```json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
}
```

#### 3.在项目根目录下面创建 config-overrides.js 文件

```js
module.exports = function override(config, env) {
  return config;
};
```

#### 4.配置

基本的操作就是这样，接下来，在做一些配置：

**① 使得按需加载 antd**

使用babel-plugin-import，它是一个用于按需加载组件代码和样式的 babel 插件

```
yarn add babel-plugin-import
```

修改 config-overrides.js 文件

```js
const { override, fixBabelImports } = require('customize-cra');
module.exports = function override(config, env) {
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
};
```

**② 自定义主题**

按照配置主题的要求，自定义主题需要用到 less 变量覆盖功能。

安装less和less-loader

```
yarn add less less-loader
```

修改 config-overrides.js 文件

```js
const { override, fixBabelImports, addLessLoader  } = require('customize-cra');
module.exports = function override(config, env) {
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  })
};
```

这里利用了 less-loader 的 modifyVars 来进行主题配置。当然这里的 modifyVars 的值也可以是一个theme 文件

**③ 打包后我们会发现静态文件夹中会有很多的css和js的map文件，那么我们该怎么关闭sourcemap呢？**

修改 config-overrides.js 文件

```js
const { override, fixBabelImports, addLessLoader  } = require('customize-cra');

process.env.GENERATE_SOURCEMAP = "false";

module.exports = function override(config, env) {
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  })
};
```

ok，再次执行 `npm run build` 便不会产生map文件了。

### 前端本地 proxy 的配置

开发中常见的问题就是跨域。那么我们前端惯用的方式就是给本地 webpack 启动的 node 服务设置代理。

那么具体到使用了新版的 cra 后，我们该怎么办呢？

很简单，在 src 目录下新建文件 setupProxy.js（注意文件名一定要是这个名字，不要问什么，cra 现在废弃了 proxy 对象配置的方式，将其作为单独模块。解析就是按 src/setupProxy.js 这个路径）

安装 http 代理相关包 http-proxy-middleware：

```
yarn add http-proxy-middleware -D
```

setupProxy.js 配置如下：

```js
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://xx.xx.xx.xx:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
```

更多 customize-cra 的信息[查看详情](https://github.com/arackaf/customize-cra)
