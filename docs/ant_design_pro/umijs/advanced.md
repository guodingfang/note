# 进阶

## Mock 数据

Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，请求模拟数据甚至逻辑，能让前端开发独立自主，不会被服务器的开发所阻塞。

### 使用 umi 的 mock 功能


umi 里约定 mock 文件夹下的文件或者 page(s)文件夹下的 _mock 文件即 mock 文件，文件导出接口定义，支持基于 `require` 动态分析的实时刷新，支持ES6语法，以及友好的错误提示。

```ts
export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
```

当客户端（浏览器）发送请求时，如：`GET /api/users` ，那么本地启动的 umi dev 会跟配置文件匹配请求路径以及方法，如果匹配到了，就会将请求通过配置处理，就可以像样例一样，可以直接放回数据，也可以通过函数处理以及重定向到另一个服务器。

比如定义如下映射规则：
```
'GET /api/currentUser': {
  name: 'momo.zxy',
  avatar: imgMap.user,
  userid: '00000001',
  notifyCount: 12,
},
```

#### 引入 Mock.js

Mock.js 是常用的辅助生成模拟数据的第三方库
```ts
import mockjs from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
};
```

#### 添加跨域请求头

设置 `response` 的请求头即可：
```ts
'POST /api/users/create': (req, res) => {
  ...
  res.setHeader('Access-Control-Allow-Origin', '*');
  ...
},
```

### 合理拆分 mock 文件

对于整个项目来说，请求接口是复杂并且繁多的，为了处理大量模拟请求的场景，通常把每一个数据模型抽象成一个文件，统一放在 `mock` 的文件夹中，然后他们会自动被引入

### 如何模拟延迟

为了更加真实的模拟网络数据请求，往往需要模拟网络延迟时间。

#### 手动添加 setTimeout 模拟延迟

可以在重写请求的代理方法，在其中添加模拟延迟的处理，如：
```ts
'POST /api/forms': (req, res) => {
  setTimeout(() => {
    res.send('Ok');
  }, 1000);
},
```

#### 使用插件模式延迟

上面的方法虽然简便，但是当需要添加所有的请求延迟的时候，可能就麻烦了，不过可以通过第三方插件来简化这个问题，如：[roadhog-api-doc#delay](https://github.com/nikogu/roadhog-api-doc/blob/master/lib/utils.js#L5) 。

```ts
import { delay } from 'roadhog-api-doc';

const proxy = {
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  },
  'GET /api/notices': getNotices,
};

// 调用 delay 函数，统一处理
export default delay(proxy, 1000);
```

### 动态 Mock 数据

如果需要动态生成 Mock 数据，应该通过函数进行处理，比如：
```ts
// 静态的
'/api/random': Mock.mock({
  // 只随机一次
  'number|1-100': 100,
}),
```
```ts
// 动态的
'/api/random': (req, res) => {
  res.send(Mock.mock({
    // 每次请求均产生随机值
    'number|1-100': 100,
  }))
},
```

### 联调

当本地开发完毕之后，如果服务器的接口满足之前的约定，那么只需要不开本地代理或者重定向代理到目标服务器就可以访问真实的服务端数据，非常方便。


## Use umi with dva

自>= umi@2起，`dva` 的整合可以直接通过 umi-plugin-react 来配置。

### 使用

用 yarn 安装依赖
```sh
$ yarn add umi-plugin-react
```

然后在 `.umirc.js` 里配置插件：
```ts
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
      },
    ]
  ],
};
```

推荐开启 dva-immer 以简化 reducer 编写
```ts
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: true
        }
      }
    ],
  ],
};
```

### model 注册

model 分两类，一是全局 model，二是页面 model，全局 model 存于 `/src/models/` 目录，所有页面都可以引用；**页面 model 不能被其他页面所引用**。

规则如下：
* `src/models/**/*.js` 为 global model
* `src/pages/**/models/**/*.js` 为 page model
* global model 全量载入，page model 在 production 时按需载入，在 development 时全量载入
* page model 为 page.js 所在路径下 `models/**/*.js` 的文件
* page model 会向上查找，比如 page js 为 `pages/a/b.js`，他的 page model 为 `pages/a/b/models/**/*.js` + `pages/a/models/**/*.js`，以此类推
* 约定 model.js 为单文件 model，解决只有一个 model 时不需要建 models 目录，有 model.js 则不去找 `models/**/*.js`

举个例子：
```
+ src
  + models
    - g.js
  + pages
    + a
      + models
        - a.js
        - b.js
        + ss
          - s.js
      - page.js
    + c
      - model.js
      + d
        + models
          - d.js
        - page.js
      - page.js
```

如上目录：
* global model 为 `src/models/g.js`
* `/a` 的 pages model 为 `src/pages/a/models/{a,b,ss/s}.js`
* `/c` 的 pages model 为 `src/pages/c/model.js`
* `/c/d` 的 pages model 为 `src/pages/c/model.js`,`src/pages/c/d/models/d.js`

### 配置及插件

详情见[具体内容](https://umijs.org/zh/guide/with-dva.html#%E9%85%8D%E7%BD%AE%E5%8F%8A%E6%8F%92%E4%BB%B6)

### FAQ

#### url变化了，但页面组件不刷新，是什么原因？

`layout/index.js`，里如果用了 connect 传数据，需要用 `uni/withRouter` 高阶一下
```js
import withRouter from 'umi/withRouter';

export default withRouter(connect(mapStateToProps)(LayoutComponent));
```

#### 如何访问到 store 或 dispatch 方法？

```
window.g_app._store
window.g_app._store.dispatch
```

#### 如何禁用包括 component 和 models 的按需加载？

在 .umirc.js 里配置：
```js
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          dynamicImport: undefined // 配置在dva里
        },
        dynamicImport: undefined   // 或者直接写在react插件的根配置，写在这里也会被继承到上面的dva配置里
      }
    ],
  ],
};
```

#### 全局 layout 使用 connect 后路由切换后没有刷新？

需用 withRouter 包一下导出的 react 组件，注意顺序
```tsx
mport withRouter from 'umi/withRouter';
export default withRouter(connect()(Layout));
```


## 按需加载

处于对性能的考虑，会对模块和组件进行按需加载。

### 按需加载组件

通过 `umi/dynamic` 接口实现，比如：
```tsx
import dynamic from 'umi/dynamic';
const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
const App = dynamic({
  loader: async function() {
    await delay(/* 1s */1000);
    return () => <div>I will render after 1s</div>;
  },
});
```

### 按需加载模块

通过 `import()` 实现，比如：
```tsx
import('g2').then(() => {
  // do something with g2
});
```

## 运行时配置

通过 `.umirc.js` 做编译时的配置，这能覆盖大量场景，但有一些却是编译时很难触及的。

比如：
* 在出错时显示个 message 提示用户
* 在加载和路由切换时显示个 loading
* 页面载入完成时请求后端，根据响应动态修改路由

更多内容。见[详情](https://umijs.org/zh/guide/runtime-config.html)

## 区块 <Badge text="2.3.0+ 中支持" type="tip" /> 

在 umi 中，区块是快速搭建页面的代码片段，umi 定义了一个区块的规范，可以发开自己的区块，也可以使用其它来源的区块。通过umi能够简单的在项目中添加umi区块，用于快速初始化代码。

### 使用区块

在项目根目录下使用如下命令可以添加一个区块到项目中：
```sh
$ umi block add [block url]  --path=[target path]
```

其中 `[block url]` 可以是一个 Github 或者 Gitlab 地址，也可以是个 Git 仓库地址，也可以是一个本地相对或者绝对路径。只要对应的路径下是一个区块的代码，满足 umi 区块的规范，那么 umi 就可以通过该命令将区块的代码下载到项目中。

`[target path]` 是要把区块添加到的路径。如果已经这个路径下已经存在路由组件，那么 umi 会把区块添加到它里面。如果没有那么 umi 会先创建一个路由组件，然后再把区块添加进去。


使用区块其余信息[查看详情](https://umijs.org/zh/guide/block.html#%E4%BD%BF%E7%94%A8%E5%8C%BA%E5%9D%97)


### 区块开发

区块开发信息[查看详情](https://umijs.org/zh/guide/block.html#%E5%8C%BA%E5%9D%97%E5%BC%80%E5%8F%91)


## 部署 <Badge text="important" type="warn" />

### 默认方案

umi@2默认对新手友好，所以**默认不做按需加载处理**，`umi build` 后输出 `index.html`、`umi.js` 和 `umi.css` 文件。

### 不输出 html 文件

某些场景 html 文件交给后端输出，前端构建并不需要输出 html 文件，可配置环境变量 `HTML=none` 实现。
```sh
$ HTML=none umi build
```

### 部署到 html 到非根目录

> 问题：为什么我本地开发是好的，部署后就没反应了，而且没有报错？

这就是应用部署在非根路径的典型现象。为什么会出现这个问题？因为路由没有匹配上，比如讲应用部署在 `/xxx/` 下，然后访问 `/xxx/hello`，而代码里匹配的是 `/hello`，那就匹配不上了，而又没有定义 fallback 的路由，比如404，那么会显示空白页。

如何解决？

可以通过配置 `base` 解决
```js
export default {
  base: '/path/to/your/app/root',
};
```

### 使用 hashHistory

可通过配置 history 为 `hash` 解决。
```js
export default {
  history: 'hash',
};
```

### 安需加载

要实现按需加载，需要装载 umi-plugin-react 插件并配置 `dynamicImport`。
```js
export default {
  plugins: [
    ['umi-plugin-react', {
      dynamicImport: true,
    }],
  ],
};
```

详情见[umi-plugin-react#dynamicImport](https://umijs.org/zh/plugin/umi-plugin-react.html#dynamicimport)

### 静态资源在非根目录或者cdn

这时，就需要配置 [publicPath](https://umijs.org/zh/config/#publicPath)。至于 publicPath 是什么？具体看 [webpack文档](https://webpack.js.org/configuration/output/#output-publicpath)，把他指向静态资源(js、css、图片、文字等)所在的路径。
```js
export default {
  publicPath: "http://yourcdn/path/to/static/"
}
```

### 使用 runtime 的 publicPath

对于需要在 html 的管理 publicPath 的场景，比如在 html 里判断环境不同的输出，可以通过配置 [runtimePublicPath](https://umijs.org/zh/config/#runtimepublicpath) 为解决。

```js
export default {
  runtimePublicPath: true,
};
```

然后在 html 里输出：
```ejs
<script>
window.publicPath = <%= YOUR PUBLIC_PATH %>
</script>
```

### 静态化

在一些场景中，无法做服务端的 html fallback，即让每个路由都输出 index.html 的内容，那么就要做静态化。


比如上面的例子，在 `.umirc.js` 里配置：
```js
export default {
  exportStatic: {},
}
```

然后执行 umi build，会把每个路由输出一个 html 文件。
```
./dist
├── index.html
├── list
│   └── index.html
└── static
    ├── pages__index.5c0f5f51.async.js
    ├── pages__list.f940b099.async.js
    ├── umi.2eaebd79.js
    └── umi.f4cb51da.css
```

> 静态化暂不支持有变量路由的场景

### HTML 后缀

有些静态化的场景中，是不会自动读索引文件的，比如支付宝的容器环境，那么就不能生成这种 html 文化：
```
├── index.html
├── list
│   └── index.html
```

而是生成：
```
├── index.html
└── list.html
```

配置方式在 `.umirc.js` 里：
```
export default {
  exportStatic: {
    htmlSuffix: true,
  },
}
```

umi build 会生成：
```
./dist
├── index.html
├── list.html
└── static
    ├── pages__index.5c0f5f51.async.js
    ├── pages__list.f940b099.async.js
    ├── umi.2924fdb7.js
    └── umi.cfe3ffab.css
```

### 静态化后输出到任意路径
```js
export default {
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
}
```

## UI 插件开发 <Badge text="2.9.0+ 中支持" />

具体信息，查看[详情](https://umijs.org/zh/guide/develop-umi-ui-plugin.html)
