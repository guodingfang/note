# Less 用法

## 安装

### 用 npm 安装

全局安装

```
npm install less -g
```

项目文件夹中安装

```
npm install less --save-dev
```


### 安装依赖

将 `css-loader`、`style-loader` 和 `less-loader` 链式调用，可以把所有样式立即应用于 DOM。

```
npm install --save-dev less-loader css-loader style-loader
```

### wbpack 配置

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader" // compiles Less to CSS
      }]
    }]
  }
};
```

有关于 less 使用的更多信息查看[详情](https://less.bootcss.com/usage/)
