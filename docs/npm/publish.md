# 创建和发布 npm 包

### 创建模块

```
npm init
```

生成了 `package.json` 配置文件

### 增加入口文件

默认的入口文件是根目录下的 `index.js`，在根目录下创建 `index.js`

```js
exports.printMsg = function() {
  console.log("This is a message from the demo package");
}
```

### 登录或注册npm账号

```
# 注册npm账号
npm adduser

# 登录npm账号  
npm login 
```

### 发布包

发布包之前，需要做两步：

* 修改 `CHANGE.MD`，这里记录了我们包发布的版本变化情况，格式自定
* 修改 `package.json` 中的 `version` 字段，表示这次发布的包的版本，如果不修改，发布会报错。
  
发布包：

```
npm publish
```

### 撤销发布

撤销发布发布过的某个版本代码

```
npm unpublish <package>@<version>
```

发布成功之后，这个包就可以通过npm install命令来进行安装了。

## 管理包的版本

当下载包和发布包时，都会关注到包的版本号，npm 使用语义版本号来管理包。

> 语义版本号组成：X.Y.Z

* X 代表主版本号，表示有大变动，向下不兼容
* Y 代表次版本号，表示新增功能，向下兼容
* Z 代表补丁版本号，表示修复 BUG
