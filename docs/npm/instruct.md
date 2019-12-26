# npm 指令

### 安装（全局安装与本地安装）

| 指令 | 功能 |
| --- | --- |
| `npm install` | 根据 `package.json` 安装项目所需的依赖包 |
| `npm install [package] --global` | 安装全局依赖包 |
| `npm install [package]` | 安装需要的依赖包，不记录写到 `package.json` 文件 |
| `npm install [package] --save` | 安装需要的依赖包，并将该包的记录写到 `package.json` 文件的 `dependencies` 选项中 |
| `npm install [package] --save-dev` | 安装所需的依赖包，并将该包的记录写到 `package.json` 文件的 `devDependencies` 选项中 |

### 卸载（全局安装与本地卸载）

| 指令 | 功能 |
| --- | --- |
| `npm uninstall [package]` | 删除 `node_modules` 目录下面的包 |
| `npm uninstall [package] --global` | 删除全局依赖包 |
| `npm uninstall --save [package]` | 删除 `node_modules` 的包和 `package.json` 文件的 `dependencies` 选项中 |
| `npm uninstall --save-dev [package]` | 删除 `node_modules` 的包和 `package.json` 文件的 `devDependencies` 选项中 |

### 更新（全局安装与本地更新）

| 指令 | 功能 |
| --- | --- |
| `npm update [package]` | 更新 `node_modules` 目录下面的包 |
| `npm update express --global` | 更新全局依赖包 |

### 查看（全局安装与本地查看）

| 指令 | 功能 |
| --- | --- |
| `npm list` | 查看本地安装包信息 |
| `npm list --global` | 查看全局安装包信息 |
| `npm list [package]` | 查看指定安装包信息 |


### 简写

| 指令 | 简写 | 写法 |
| --- | --- | --- |
| `install` | `i` | `npm i [package] --save` | 
| `--global` | `-g` | `npm uninstall -g [package]` |
