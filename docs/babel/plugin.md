# Babel 插件

## 插件

Babel 是一个编译器（输入源码 => 输出编译后的代码）。就像其他编译器一样，编译过程分为三个阶段：解析、转换和打印输出。

现在，Babel 虽然开箱即用，但是什么动作都不做。它基本上类似于 `const babel = code => code;`，将代码解析之后再输出同样的代码。如果想要 Babel 做一些实际的工作，就需要为其添加插件。

除了一个一个的添加插件，你还可以以 `preset` 的形式启用一组插件。

### 转换插件

这些插件用于转换你的代码。

> 转换插件将启用相应的语法插件，因此你不必同时指定这两种插件。

更多转换插件[查看](https://www.babeljs.cn/docs/plugins)

### 语法插件

这些插件只允许 Babel **解析（parse）** 特定类型的语法（而不是转换）。

> 注意：转换插件会自动启用语法插件。因此，如果你已经使用了相应的转换插件，则不需要指定语法插件。


或者，你也可以通过 Babel 解析器传递任何 plugins 参数 ：

```
# .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

### 插件/Preset 路径

如果插件在 npm 上，可以输入插件的名称，babel 会自动检查它是否已经被安装到 `noed_modules` 目录下

```json
{
  "plugins": ["babel-plugin-myPlugin"]
}
```

### 插件的短名称

如果插件名称的前缀为 `babel-plugin-`，还可以使用它们的短名称（两个插件实际是同一个）：

```json
{
  "plugins": [
    "myPlugin",
    "babel-plugin-myPlugin"
  ]
}
```

这也适用于带有冠名（scope）的插件（ 两个插件实际是同一个）：

```json
{
  "plugins": [
    "@org/babel-plugin-name",
    "@org/name"
  ]
}
```

### 插件顺序

> 插件的排列顺序很重要。

这意味着如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 preset 的排列顺序依次执行。

* 插件在 Presets 前运行。
* 插件顺序从前往后排列。
* Preset 顺序是颠倒的（从后往前）。

```json
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

先执行 `transform-decorators-legacy`，在执行 `transform-class-properties`。

重要的时，preset 的顺序是 颠倒的。如下设置：

```json
{
  "presets": ["es2015", "react", "stage-2"]
}
```

将按如下顺序执行：`stage-2`、`react` 然后是 `es2015`。

### 插件参数

插件和 preset 都可以接受参数，参数由插件名和参数对象组成一个数组，可以在配置文件中设置。

要指定参数，请传递一个以参数名作为键（key）的对象。

```json
{
  "plugins": [
    [
      "transform-async-to-module-method",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
}
```

preset 的设置参数的工作原理完全相同：

```json
{
  "presets": [
    [
      "env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```


## 预设（Presets）

不想自己动手组合插件？没问题！preset 可以作为 Babel 插件的组合，甚至可以作为可以共享的 `options` 配置。

### 官方 Preset

* @babel/preset-env
* @babel/preset-flow
* @babel/preset-react
* @babel/preset-typescript

### Stage-X （实验性质的 Presets）

stage-x preset 中的语法转换会随着被批准为 JavaScript 新版本的组成部分而进行相应的改变（例如 ES6/ES2015）。

::: warning 注意
这些提案可能会有变化，因此，特别是处于 stage-3 之前的任何提案，请务必谨慎使用。在每次 TC39 会议之后，如果有可能，在提案变更时更新 stage-x 的 preset。
:::

TC39 将提案分为以下几个阶段：
* Stage 0 - 设想：只是一个想法，可能有 Babel插件。
* Stage 1 - 建议：这是值得跟进的。
* Stage 2 - 草案：初始规范。
* Stage 3 - 候选：完成规范并在浏览器上初步实现。
* Stage 4 - 完成：将添加到下一个年度版本发布中。


预设（Presets）详情 [查看](https://www.babeljs.cn/docs/presets)

