# @babel/preset-env

`@babel/preset-env` 是一个智能预设，可以让你使用最新的 JavaScript，而无需微观管理目标环境所需的语法转换（以及可选的浏览器polyfill）。

`@babel/preset-env` 可以根据配置的目标浏览器或运行环境来自动将 ES2015+ 转换为 es5。

## 安装

```
# 使用 npm
npm install --save-dev @babel/preset-env 
# or
# 使用 yarn
yarn add @babel/preset-env --dev
```

## 工作原理

> 重要的是要注意，`@babel/preset-env` 它不支持 stage-x 插件。


## Browserslist 集成

Browserslist 配置能够分享目标浏览器和 nodejs 版本在不同的前端工具。主要是为了表示当前项目的浏览器兼容情况。

推荐写在 `package.json` 中。

官方默认配置:

```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8",
    "safari >= 7"
  ]
}
```

对于部分配置参数做一些解释：
* `"> 1%"` :代表着全球超过 1% 人使用的浏览器
* `"last 2 versions"`：表示所有浏览器兼容到最后两个版本
* `"not ie <= 8"`：表示 IE 浏览器版本大于 8（实则用 npx browserslist 跑出来不包含 IE9 ）
* `"safari >= 7"`：表示 safari 浏览器版本大于等于 7

具体信息，查看[详情](https://www.jianshu.com/p/bbe85745e655)

## 选项（Options）

### `targets`

`string | Array<string> | { [string]: string }`，默认为 `{}`。

描述您为项目支持/目标的环境。

这可以是与浏览器列表兼容的查询：

```json
{
  "targets": "> 0.25%, not dead"
}
```

或支持最低环境版本的对象：

```json
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

实施例的环境中：`chrome`，`opera`，`edge`，`firefox`，`safari`，`ie`，`ios`，`android`，`node`，`electron`。

### `spec` 

`boolean`，默认为 `false`。

为此预设中支持它们的任何插件启用更符合规范要求，但可能更慢的转换。

### `loose`

`boolean`，默认为 `false`。

为该预设中允许它们的所有插件启用“宽松”转换。

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`，默认为 `"auto"`。

启用将ES6模块语法转换为其他模块类型的功能。

设置为false不会转换模块。

另请注意，这 `cjs` 只是的别名 `commonjs`。

### `debug`

`boolean`，默认为 `false`。

将使用的目标/插件以及插件数据版本中指定的版本输出到 `console.log`。

### `include`

`Array<string|RegExp>`，默认为 `[]`

始终包含的一系列插件。

详细的值[查看详情](https://www.babeljs.cn/docs/babel-preset-env#include)

### `exclude`

`Array<string|RegExp>`，默认为 `[]`

总是要排除/删除的一系列插件。

可能的选项与include选项相同。

