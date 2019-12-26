# npm 介绍

NPM 是随同 NodeJS 一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
* 允许用户从 NPM 服务器下载别人编写的第三方包到本地使用。
* 允许用户从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。
* 允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。

## npm 安装和与升级

与 NodeJs 一起集成安装，安装 NodeJS 时安装 npm。

### 查看所安装的 npm 版本

```
$ npm -v
6.12.0
```

### 查看帮组

```
npm help <command>
```

### 升级 npm

```
npm install npm -g
# 升级到最新版本
npm install npm@latest -g
```

### 使用淘宝镜像的命令：

可使用 `cnpm` 指令替代 `npm` 指令

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 使用 nrm 来管理切换 npm 源

nrm 专门用来管理和快速切换私人配置的 registry。

```
# 安装
npm install -g nrm

# 列出可选源
nrm ls

# 增加源
nrm add <源名称> <源地址>   #比如企业或组织有自己的私有源（镜像）时

# 删除源
nrm del

# 测试源响应
nrm test   #测试所有源
nrm test npm  #测试npm官方源
```

列出可选源

```
nrm ls
```



## 使用 `package.json`

npm 的核心是包，npm 将它管理的程序都叫包，每个包里有个 `package.json` 文件，位于包的根目录下，用于定义包的属性（配置信息），比如包的名称、版本、许可证等等。

在进行 `npm install` 命令时，就是根据这个配置文件，来自动下载这个包所需的模块，配置项目所需的运行和开发环境。

管理本地安装的 npm 包的最佳方法是创建一个 `package.json` 文件。

一个 `package.json` 文件：
* 列出项目所依赖的软件包。
* 允许使用语义版本控制规则指定项目可以使用的软件包的版本。
* 使项目的构建具有可复制性，因此更易于与其他开发人员共享。


### 创建 `package.json`

项目根目录下运行

```
npm init
```

### `package.json` 文件配置

```json
{
    "name": "Hello World", // 包名
    "version": "0.0.1",// 包的版本号，主版本.次版本.补丁版本
    "author": "张三",// 包的作者，格式设置：Your Name <email@example.com> (http://example.com)
    "description": "第一个node.js程序",// 包的描述
    "keywords":["node.js","javascript"],// 包的关键词
        "main":"index.js",// main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
    "repository": {// 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
        "type": "git",
        "url": "https://path/to/url"
    },
    "license":"MIT",// 包的版权协议
    "engines": {"node": "0.10.x"},// 该模块运行的平台，比如 Node 的某个版本或者浏览器
    "bugs":{"url":"http:// path/to/bug","email":"bug@example.com"},
    "contributors":[{"name":"李四","email":"lisi@example.com"}],// 包的其他贡献者姓名
    "scripts": {// 运行脚本命令的npm命令行缩写，执行命令：npm run <命令名>
        "start": "node index.js"
    },
        "config":{// 添加命令行的环境变量
                "port":"8080"// 可以在js中通过process.env.npm_package_config_port获取，可以通过npm config set <包名>:port 80修改
        },
        "browser": {// 供浏览器使用的版本
                "tipso": "./node_modules/tipso/src/tipso.js"
        },
    "dependencies": {// 项目运行依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 * node_module 目录下
        "express": "latest",
        "mongoose": "~3.8.3",
        "handlebars-runtime": "~1.0.12",
        "express3-handlebars": "~0.5.0",
        "MD5": "~1.2.0"
    },
    "devDependencies": {// 项目开发依赖包列表
        "bower": "~1.2.8",
        "grunt": "~0.4.1",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-jshint": "~0.7.2",
        "grunt-contrib-uglify": "~0.2.7",
        "grunt-contrib-clean": "~0.5.0",
        "browserify": "2.36.1",
        "grunt-browserify": "~1.3.0",
    }
}
```

* name：目录名称
* version：版本号
* description： 项目描述信息
* main：程序的主入口文件
* scripts：允许运行的脚步指令
* keywords：关键字
* author：作者名称
* license：包的版权协议
* bugs：当前目录中的信息（如果存在）
* homepage：当前目录中的信息（如果存在）
* dependencies：生产中需要的依赖包
* devDependencies：开发中需要的依赖包


### 依赖包版本格式

* 指定：1.2.2
* `~` + 指定：`~1.2.2`，表示安装 1.2.x 的最新版本（不低于 1.2.2，小于 1.3.x）
* `^` + 指定：`^1.2.2`，表示安装 1.x.x 的最新版本，（不低于 1.2.2，小于 2.x.x）
* `latest`：最新版本
