# gulp 介绍

gulp 是一个自动化构建工具，主要用来设置程序自动处理静态资源的工作。简单的说，gulp 就是用来打包项目的。

## 安装

### 检查 node、npm 和 npx 是否正确安装

```
# 检查 node 版本号
node --version

# 检查 npm 版本号
npm --version

# 检查 npx 版本号
npx --version
```

### 安装 gulp 命令行工具

```
npm install --global gulp-cli
```

### 创建项目目录并进入

```
npx mkdirp my-project

cd my-project

# 在项目目录下创建 package.json 文件
npm init
```

### 安装 gulp 作为开发时依赖项

```
npm install --save-dev gulp
```

### 检查 gulp 版本

```
gulp --version
```

### 创建 gulpfile 文件

```js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

### 测试

在项目根目录下执行 gulp 命令：

```
gulp

# 如需运行多个任务（task），可以执行
gulp <task> <othertask>
```

### 输出结果

默认任务（task）将执行，因为任务为空，因此没有实际动作。

```
[16:45:42] Using gulpfile D:\technology\demo\my-project\gulpfile.js
[16:45:42] Starting 'default'...
[16:45:42] Finished 'default' after 2.26 ms
```

## JavaScript 和 Gulpfile

gulp 允许使用 JavaScript 写 gulpfile 文件。

gulpfile 是项目目录下名为 `gulpfile.js` 的文件，在运行 `gulp` 命令时会被自动加载。

可以使用需要转译的编程语言来书写 gulpfile 文件，例如 TypeScript 或 Babel，通过修改 `gulpfile.js` 文件的扩展名来表明所用的编程语言并安装对应的转译模块。

* 对于 TypeScript，重命名为 `gulpfile.ts` 并安装 ts-node 模块。
* 对于 Babel，重命名为 `gulpfile.babel.js` 并安装 @babel/register 模块。

每个任务（task）可以被分割为独立的文件，然后导入（import）到 gulpfile 文件中并组合。这不仅使事情变得井然有序，而且可以对每个任务（task）进行单独测试，或者根据条件改变组合。

## 创建任务（task）

每一个 gulp 任务（task）都是一个异步的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数。

### 导出任务

任务（task）可以是 public（公开）或 private（私有）类型的。

* 公开任务：从 gulpfile 中被导出（export），可以通过 gulp 命令直接调用。
* 私有任务：被设计为在内部使用，通常作为 `series()` 或 `parallel()` 组合的组成部分。

```js
const { series } = require('gulp');

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
exports.default = series(clean, build);
```

### 组合任务

Gulp 提供了两个强大的组合方法： `series()` 和 `parallel()`，允许将多个独立的任务组合为一个更大的操作。

这两个方法都可以接受任意数目的任务（task）函数或已经组合的操作。`series()` 和 `parallel()` 可以互相嵌套至任意深度。

如果需要让任务（task）按顺序执行，请使用 `series()` 方法：

```js
const { series } = require('gulp');

function transpile(cb) {
  // body omitted
  cb();
}

function bundle(cb) {
  // body omitted
  cb();
}

exports.build = series(transpile, bundle);
```

对于希望以最大并发来运行的任务（tasks），可以使用 `parallel()` 方法将它们组合起来：

```js
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```

## 异步执行

当从任务（task）中返回 stream、promise、event emitter、child process 或 observable 时，成功或错误值将通知 gulp 是否继续执行或结束。

如果任务（task）出错，gulp 将立即结束执行并显示该错误。

当使用 `series()` 组合多个任务（task）时，任何一个任务（task）的错误将导致整个任务组合结束，并且不会进一步执行其他任务。

当使用 `parallel()` 组合多个任务（task）时，一个任务的错误将结束整个任务组合的结束，但是其他并行的任务（task）可能会执行完，也可能没有执行完。

具体异步执行详情[查看](https://www.gulpjs.com.cn/docs/getting-started/async-completion/)


## 处理文件

gulp 暴露了 `src()` 和 `dest()` 方法用于处理计算机上存放的文件。

`src()` 接收 glob 参数，并从文件系统中读取文件然后生成一个 Node 流（stream）。它将所有匹配的文件读取到内存中并通过流（stream）进行处理。

由 `src()` 产生的流（stream）应该从任务（task）中返回并发出异步完成的信号，就如 创建任务（task）。

```js
const { src, dest } = require('gulp');

exports.default = function() {
  return src('src/*.js')
    .pipe(dest('output/'));
}
```

流（stream）所提供的主要的 API 是 `.pipe()` 方法，用于连接转换流（Transform streams）或可写流（Writable streams）。

```js
const { src, dest } = require('gulp');
const babel = require('gulp-babel');

exports.default = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(dest('output/'));
}
```

`dest()` 接受一个输出目录作为参数，并且它还会产生一个 Node 流（stream），通常作为终止流（terminator stream）。当它接收到通过管道（pipeline）传输的文件时，它会将文件内容及文件属性写入到指定的目录中。


## Glob 详解

glob 是由普通字符和/或通配字符组成的字符串，用于匹配文件路径。可以利用一个或多个 glob 在文件系统中定位文件。

`src()` 方法接受一个 glob 字符串或由多个 glob 字符串组成的数组作为参数，用于确定哪些文件需要被操作。

glob 或 glob 数组必须至少匹配到一个匹配项，否则 `src()` 将报错。

### 特殊字符： * (一个星号)

在一个字符串片段中匹配任意数量的字符，包括零个匹配。对于匹配单级目录下的文件很有用。

下面这个 glob 能够匹配类似 index.js 的文件，但是不能匹配类似 scripts/index.js 或 scripts/nested/index.js 的文件。

```
'*.js'
```

### 特殊字符： ** (两个星号)

在多个字符串片段中匹配任意数量的字符，包括零个匹配。 对于匹配嵌套目录下的文件很有用。请确保适当地限制带有两个星号的 glob 的使用，以避免匹配大量不必要的目录。

下面这个 glob 被适当地限制在 `scripts/` 目录下。它将匹配类似 `scripts/index.js`、`scripts/nested/index.js` 和 `scripts/nested/twice/index.js` 的文件。

```
'scripts/**/*.js'
```

### 特殊字符： ! (取反)

取反 glob 删除匹配项中的一部分

```
['script/**/*.js', '!scripts/vendor/']
```

## 文件监控

gulp api 中的 `watch()` 方法利用文件系统的监控程序将 globs 与 任务（task） 进行关联。

它对匹配 glob 的文件进行监控，如果有文件被修改了就执行关联的任务（task）。如果被执行的任务（task）没有触发 异步完成 信号，它将永远不会再次运行了。

此 API 的默认设置是基于通常的使用场景的，而且提供了内置的延迟和排队机制。

```js
const { watch, series } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

// 可以只关联一个任务
watch('src/*.css', css);
// 或者关联一个任务组合
watch('src/*.js', series(clean, javascript));
```

::: warning 警告：
避免同步任务
:::

详细信息[查看](https://www.gulpjs.com.cn/docs/getting-started/watching-files/)
