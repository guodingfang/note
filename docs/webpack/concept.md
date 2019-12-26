# 概念

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是高度可配置的。在开始前需要先理解四个**核心概念**：
* 入口（entry）
* 输出（output）
* loader
* 插件（plugins）

### 入口(entry)

入口起点指示 webpack 应该使用哪个模块，来作为构建其内部依赖的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

可以通过 webpack 配置 中配置 `entry` 属性，来指定一个入口起点（或多个入口起点）。默认值为 `./src`。

```js
// webpack.config.js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

### 出口(output)

`output` 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `./dist`。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

```js
// webpack.config.js
const path = require('path');   // Node.js 核心模块，用于操作文件路径
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
}
```

在上面的示例中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。

### loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后就可以利用 webpack 的打包功能，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

::: warning 注意：
loader 能够 `import` 导入任何类型的模块（例如 `.css` 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。
:::

在更高层面，在 webpack 的配置中 loader 有两个目标：
* `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
* `use` 属性，表示进行转换时，应该使用哪个 loader。

```js
// webpack.config.js
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

以上配置中，对一个单独的 module 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `ues`。

这告诉 webpack 编译器(compiler) 如下信息：

> “嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。” 

### 插件(plugins)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。

插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

### 模式

通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的 webpack 内置的优化：

```js
// webpack.config.js
module.exports = {
  mode: 'production'
};
```

## 入口起点

### 单个入口（简写）语法

用法：`entry: string | Array<string>`

```js
// webpack.config.js
const config = {
  entry: './path/to/my/entry/file.js'
  // or
  entry: {
    main: './path/to/my/entry/file.js'
  }
};

module.exports = config;
```

### 对象语法

用法：`entry: {[entryChunkName: string]: string|Array<string>}`

```js
// webpack.config.js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

### 多页面应用程序

```js
// webpack.config.js
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

## 输出

配置 `output` 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口文件，但只能指定一个输出配置。

### 用法

在 webpack 中配置 `output` 属性的最低要求是，将它的值设置为一个对象，包括以下两点：
* `filename`：用于输出文件的文件名
* `path`：目录输出的绝对路径

```js
// webpack.config.js
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};

module.exports = config;
```

此配置将一个单独的 `bundle.js` 文件输出到 `/home/proj/public/assets` 目录中。

### 多个入口起点

如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符(substitutions)来确保每个文件具有唯一的名称。

```js
const config = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
  // 写入到硬盘：./dist/app.js, ./dist/search.js
}
```

## 模式

提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化

### 用法

只在配置中提供 `mode` 选项：

```js
module.exports = {
  mode: 'production'
};
```

支持以下字符串值：

| 选项 | 描述 |
| --- | --- |
| `development` | 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 |
| `production` | 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`. |

### mode: development

```
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

### mode: production

```
// webpack.production.config.js
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}
```

## loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript

```
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

配置 webpack

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

### 使用 loader

在你的应用程序中，有三种使用 loader 的方式：
* 配置：在 webpack.config.js 文件中指定 loader。
* 内联：在每个 import 语句中显式指定 loader。
* CLI：在 shell 命令中指定它们。

### 配置

module.rules 允许你在 webpack 配置中指定多个 loader。 

```js
module: {
  rules: [
    {
      test: '/\.css$/',
      ues: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { modules: true } }
      ]
    }
  ]
}
```

### 内联

可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 ! 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

### CLI

你也可以通过 CLI 使用 loader：

```
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

这会对 `.jade` 文件使用 jade-loader，对 `.css` 文件使用 style-loader 和 css-loader


### loader 特性

* loader 支持链式传递。
* loader 可以是同步的，也可以是异步的。
* loader 接收查询参数。用于对 loader 传递配置。
* loader 也能够使用 options 对象进行配置。
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
* 插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。

## 插件

插件是 webpack 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上

插件目的在于解决 loader 无法实现的其他事。

### 剖析

webpack 插件是一个具有 `apply` 属性的 JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

```js
// ConsoleLogOnBuildWebpackPlugin.js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中复用。

### 用法

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。

根据你的 webpack 用法，这里有多种方式使用插件。

### 配置

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

## 模块

### 什么是 webpack 模块

对比 Node.js 模块，webpack 模块能够以各种方式表达它们的依赖关系，几个例子如下：
* ES2015 `import` 语句
* CommonJS `require()` 语句
* AMD `define` 和 `require` 语句
* css/sass/less 文件中的 `@import` 语句
* 样式 (`url(...)`) 或 HTML 文件 (`<img src=...>`)中的图片链接(image url)

## 模块解析

当打包时，webpack 使用 `enhanced-resolve` 来解析文件路径

### webpack 中的解析规则

使用 `enhanced-resolve`，webpack 能够解析三种文件路径：

#### 绝对路径

```js
import "/home/me/file";

import "C:\\Users\\me\\file";
```

#### 相对路径

```js
import "../src/file1";
import "./file2";
```

#### 模块路径

```js
import "module";
import "module/lib/file";
```

## 依赖图

任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 依赖关系。

webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。从这些 入口起点 开始，webpack 递归地构建一个 依赖图 ，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 bundle - 通常只有一个 - 可由浏览器加载。

## 构建目标

构建目标(targets) 的具体[详情查看](https://www.webpackjs.com/concepts/targets/)

## 模块热替换

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
* 保留在完全重新加载页面时丢失的应用程序状态
* 只更新变更内容，以节省宝贵的开发时间。
* 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

### 这一切是如何运行的？

让我们从一些不同的角度观察，以了解 HMR 的工作原理……

#### 在应用程序中

通过以下步骤，可以做到在应用程序中置换(swap in and out)模块：

1. 应用程序代码要求 HMR runtime 检查更新。
2. HMR runtime（异步）下载更新，然后通知应用程序代码。
3. 应用程序代码要求 HMR runtime 应用更新。
4. HMR runtime（同步）应用更新。

#### 在编译器中

除了普通资源，编译器(compiler)需要发出 "update"，以允许更新之前的版本到新的版本。"update" 由两部分组成：

1. 更新后的 manifest(JSON)
2. 一个或多个更新后的 chunk (JavaScript)

manifest 包括新的编译 hash 和所有的待更新 chunk 目录。每个更新 chunk 都含有对应于此 chunk 的全部更新模块（或一个 flag 用于表明此模块要被移除）的代码。

#### 在模块中

HMR 是可选功能，只会影响包含 HMR 代码的模块。

举个例子，通过 style-loader 为 style 样式追加补丁。为了运行追加补丁，style-loader 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。

#### 在 HMR Runtime 中

对于模块系统的 runtime，附加的代码被发送到 `parents` 和 `children` 跟踪模块。在管理方面，runtime 支持两个方法 `check` 和 `apply`。

具体详情[查看](https://www.webpackjs.com/concepts/hot-module-replacement/#在-hmr-runtime-中)
