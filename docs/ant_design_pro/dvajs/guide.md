# 指南

##  介绍

dva 首先是一个基于 redux 和 redux-sage 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

### 特性
* 易学易用，仅有6个api，对 redux 用户尤其友好，[配合 umi 使用](../umijs/guide.md)后更是降低为 0 API
* elm概念，通过 reducers，effects 和 subscriptions 组织 model
* 插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍一遍写 showLoading 和 hideLoading
* 支持 HMR，基于 babel-plugin-dva-hmr 实现components、routes 和 models 的HMR

## 快速上手

### 安装 dva-cli

通过 npm 安装 dva-cli 并确保版本是 `0.9.1` 或以上。
```sh
$ npm install dva-cli -g
$ dva -v
dva-cli version 0.9.1
```

### 创建新应用

安装完 dva-cli 之后，就可以在命令行里访问到 `dva` 命令。现在，通过 `dva new` 创建新应用。
```sh
$ dva new dva-quickstart
```

这会创建 `dva-quickstart` 目录，包含项目初始化目录和文件，并提供开发服务器、构建脚本、数据 mock 服务、代理服务器等功能。

然后 `cd` 进入 `dva-quickstart` 目录，并启动开发服务器：
```sh
$ cd dva-quickstart
$ npm start
```

成功后，就可以看到 dva 的欢迎界面。


### 使用 antd

通过 npm 安装 `antd` 和 `babel-plugin-import`。`babel-plugin-import` 是用来按需加 antd 脚本和样式的。
```sh
$ npm install antd babel-plugin-import --save
```

编辑 `.webpackrc`，使 `babel-plugin-import` 插件生效。
``` 
{
+  "extraBabelPlugins": [
+    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
+  ]
}
```

### 定义路由

路由可以想象成是组成应用的不同页面。

新建 route component `routes/Products.js`，内容如下：
```tsx
import React from 'react';

const Products = (props) => (
  <h2>List of Products</h2>
);

export default Products;
```

添加路由信息到路由表，编辑 `router.js` ：
```ts
+ import Products from './routes/Products';
...
+ <Route path="/products" exact component={Products} />
```

然后在浏览器里打开 http://localhost:8000/#/products ，可以看到定义的 `<h2>` 标签。

### 编写 UI Component

需要在多个UI元素（或在一个页面使用多次），在 dva 里你可以把这部分抽成 component 。

编写一个 `ProductList` component , 这样就能再不同的地方显示产品列表了。

新建 `components/ProductList.js` 文件：
```tsx
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
```

### 定义 Model

完成 UI 后，现在开始处理数据和逻辑

dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects ，订阅数据源的 subscriptions 。

新建 model `model/products.js` ：
```js
export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
```

这里的 model 里：
* `namespace` 表示全局 state 上的 key
* `state` 是初始值，在这里是空数组
* `reducers` 等同于 redux 里的 reducer，接收 action ，同步更新 state

然后别忘记在 `index.js` 里载入他：
```js
// 3. Model
+ app.model(require('./models/products').default);
```

### connect 起来

到这里，已经单独完成 model 和 component ，那么他们如何串联起来？

dva 提供了 connect 方法。如果熟系 redux ，这个 connect 就是 react-redux 的 connect。

编辑 `routes/Products.js`，替换为以下内容：
```tsx
import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);
```

初始化一些数据让应用 run 起来。编辑 `index.js` ：
```
- const app = dva();
+ const app = dva({
+   initialState: {
+     products: [
+       { name: 'dva', id: 1 },
+       { name: 'antd', id: 2 },
+     ],
+   },
+ });
```

### 构建应用

完成开发并且在开发环境验证之后，就需要部署给用户了，先执行下面的命令：
```sh
$ npm run build
```

输出应该如下:
```sh
> @ build /private/tmp/myapp
> roadhog build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  82.98 KB  dist/index.js
  270 B     dist/index.css
```

`build` 命令会打包所有的资源，包含 JavaScript，CSS，web fonts，images，html 等。然后你可以在 `dist/` 目录下找到这些文件。

## Dva 概念

### 数据流向

数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 `dispath` 发起一个 action，如果是同步行为会直接通过 `Reducers` 改变 `State`，如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State` ，所以在 dva 中，数据流向非常清晰简明，并且思路基本跟开源社区保持一致（也是来自于开源社区）。

![Dva数据流向](../images/dva-flow.png)

### Models

#### State

`type State = any`

State 表示 Model 的状态数据，通常表现为一个 JavaScript 对象（当然它可以是任何值）；操作的时候每次都要当作不可变数据（immutable data）来对待，保证每次都是全新的对象，没有引用关系，这样才能保证 State 的独立性，便于测试和追踪变化。

在 dva 中可以通过 dva 的实例属性 `_stroe` 看到顶部的 state 数据，但通常很少用到：
```js
const app = dva();
console.log(app._store); // 顶部的 state 数据
```

#### Action

`type AsyncAction = any`

Action 是一个普通 JavaScript 对象，它是改变 State 的唯一途径。无论是从UI事件、网络回调，还是 WebSocket 等数据源所获得
的数据，最终都会通过 dispatch 函数调用一个 action，从而改变对应的数据。action 必须带 `type` 属性指明具体的行为，其他字段可以自定义，如果要发起一个 action 需要使用 `dispath` 函数；需要注意的是 `dispath` 是在组件 connect Models 以后，通过 props 传入的。
```js
dispatch({
  type: 'add',
})
```

#### dispatch 函数

`type dispatch = (a: Action) => Action`

dispatching function 是一个用于触发 action 的函数，action 是改变 State 的唯一途径，但是它只描述了一个行为，而 dispatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的。

在 dva 中， connect Model 的组件通过 props 可以访问到 dispatch ，可以访问 Model 中的 Reducer 或者 Effects，常见场景如：
```js
dispatch({
  type: 'user/add', // 如果在 model 外调用，需要添加 namespace
  payload: {}, // 需要传递的信息
});
```

#### Reducer

`type Reducer<S, A> = (state: S, action: A) => S`

Reducer（也称为 reducing function）函数接受两个参数：之前已经累积的值，返回的是一个新的累积结果。该函数把一个集合归并成为一个单值。

Reducer 的概念来自于是函数式编程。很多语言中都有 reduce API。如在 JavaScript 中：
```js
[{x:1},{y:2},{z:3}].reduce(function(prev, next){
    return Object.assign(prev, next);
})
//return {x:1, y:2, z:3}
```

在 dva 中，reducers 聚合积累的结果是当前 model 的 state 对象。通过 actions 中传入的值，与当前 reducers 中的值进行运算获得新的值（也就是新的 state）。需要注意的是 Reducer 必须是纯函数，所以同样的输入必然得到同样的输出，它们不应该产生任何副作用。并且，每一次计算都应该使用 immutable data，这种特性简单理解就是每次操作都返回一个全新的数据（独立，纯净），所以热重载和时间旅行这些功能才能够使用。

#### Effect

Effect 被称为副作用，在应用中，最常见的就是异步操作。它来自函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出。

dva 为了控制副作用的操作，底层引入了 redux-sagas 做异步流程控制，由于采用了 generator 的相关概念，所以将异步转换为同步写法，从而将 effects 转换为纯函数。[详情](https://dvajs.com/guide/concepts.html#effect)

#### Subscription

Subcription 是一种从源获取数据的方法，它来自于 elm。

Subcription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
```js
import key from 'keymaster';
...
app.model({
  namespace: 'count',
  subscriptions: {
    keyEvent({dispatch}) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  }
});
```

### Router

这里的路由通常指的是前端路由，由于我们的应用现在通常是单页应用，所以需要前端代码来控制路由逻辑，通过浏览器提供的 History API 可以监听浏览器url的变化，从而控制路由相关操作。

dva 实例提供了 router 方法来控制路由，使用的是 react-router
```tsx
import { Router, Route } from 'dva/router';
app.router(({history}) =>
  <Router history={history}>
    <Route path="/" component={HomePage} />
  </Router>
);
```

### Route Components

在组件化设计方法中，提到过 Container Components，在 dva 中我们通常将其约束为 Route Components，因为在 dva 中通常以页面维度设计Container Components。

所以在 dva 中，通常需要 connect Model 的组件都是 Route Components，组织在 `/routes/` 目录下，而 `/components/` 目录下则是纯组件。


