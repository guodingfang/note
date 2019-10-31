# 配置

具体配置请查看[详细信息](https://umijs.org/zh/config/)

## 基本配置

### plugins
* 类型：`Array`
* 默认值：`[]`

配置插件列表

数组项为指向插件的路径，可以是 npm 依赖、相对路径或绝对路径。如果是相对路径，则会从项目根目录开始找。比如：
```js
export default {
  plugins: [
    // npm 依赖
    'umi-plugin-react',
    // 相对路径
    './plugin',
    // 绝对路径
    `${__dirname}/plugin.js`,
  ],
};
```

如果插件有参数，则通过数组的形式进行配置，第一项是路径，第二项是参数，类似 babel 插件的配置方式。比如：
```js
export default {
  plugins: [
    // npm 依赖
    'umi-plugin-react',
    // 相对路径
    './plugin',
    // 绝对路径
    `${__dirname}/plugin.js`,
  ],
};
```

### routes
* 类型：`Array`
* 默认值：`null`

配置路由

umi 的路由基于 react-router 实现，配置和 react-router@4 基本一致
```js
export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: './user/login' },
      ],
    },
  ],
};
```

::: tip 注意：
* component 指向的路由组件文件是从 `src/pages` 目录开始解析的
* 如果配置了 `routes` ，则优先使用配置式路由，且约定路由会不生效
:::

### disableRedirectHoist
* 类型：`Boolean`
* 默认值：`false`

禁止 redirect 上提

出于一些原因考虑，在处理路由时把所以的 redirect 声明提到路由最前面进行匹配，但这导致了一些问题，所以添加了这个配置项，禁用 redirect 上提。
```js
export default {
  disableRedirectHoist: true,
};
```

### history
* 类型：`String | [String, Object]`
* 默认值：`browser`

指定 history 类型，可选 `browser`、`hash` 和 `memoey`。比如：
```js
export default {
  history: 'hash',
};
```

### outputPath
* 类型：`String`
* 默认值：`./dist`

指定输出路径。

### base
* 类型：`String`
* 默认值：`/`

指定 react-router 的 base，部署到非根目录时需要配置。

### publicPath
* 类型：`String`
* 默认值：`/`

指定 webpack 的 publicPath ，指向静态资源文件所在的路径。

### runtimePublicPath
* 类型：`Boolean`
* 默认值：`false`

值为 `true` 时使用 HTML 里指定的 `window.publicPath`。

### cssPublicPath
* 类型：`String`
* 默认值：同 publicPath

为 CSS 指定额外的 publicPath 。

### mountElementId
* 类型：`String`
* 默认值：`root`

指定 react app 渲染到的 HTML 元素 id。

### hash
* 类型：`Boolean`
* 默认值：`false`

是否开启 hash 文件后缀。

### targets <Badge text="2.1.0+" />
* 类型：`Object`
* 默认值：`{chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10}`

配置浏览器最低版本，会自动引入 polyfill 和语法转化，配置的 targets 会和合并到默认值，所以不需要重复配置。

比如要兼容ie11，需配置：
```js
export default {
  targets: {
    ie: 11,
  },
};
```

### context
* 类型：`Object`
* 默认值：`{}`

配置全局 context ，会覆盖到每个 pages 里的 context。

### exportStatic
* 类型：Boolean
* 默认值：false

### exportStatic.htmlSuffix
* 类型：`Boolean`
* 默认值：`false`

启用 .html 后缀。

### exportStatic.dynamicRoot
* 类型：`Boolean`
* 默认值：`false`

部署到任意路径。

### singular
* 类型：`Boolean`
* 默认值：`false`

如果设为 `true`，启用单数模式的目录。
* src/layout/index.js
* src/page
* model（如果有开启 umi-plugin-dva 插件的话）

### mock.exclude
* 类型：`Array` of `String`
* 默认值：`[]`

排除 mock 目录下不作 mock 处理的文件
比如要 exclude 所有 _ 前缀的文件和文件夹，
```js
export default {
  mock: {
    exclude: ['mock/**/_*.js', 'mock/_*/**/*.js'],
  },
};
```
### ssr <Badge text="beta" type="warn" /> <Badge text="2.8.0+" />
* 类型：`Boolean | Object`
* 默认值：`false`

用于服务端渲染（Server-Side Render）。

开启后，生成客户端静态文件的同时，也会生成 `umi.server.js` 和 `ssr-client-mainifest.json` 文件。具体内容查看[详情](https://umijs.org/zh/config/#ssr)


## webpack

具体内容查看[详情](https://umijs.org/zh/config/#webpack)
