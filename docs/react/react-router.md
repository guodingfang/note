# React 前端路由

## 简介

使用React构建的单页面应用，使用路由实现页面跳转。在React中，常用的有两个包可以实现这个需求，那就是 `react-router` 和 `react-router-dom`。

* `react-router`：实现了路由的核心功能

* `react-router-dom`：基于 `react-router`，加入了在浏览器运行环境下的一些功能。`react-router-dom` 依赖 `react-router`，所以我们使用npm安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装 `react-router`。


### 安装

```
npm install react-router-dom
yarn add react-router-dom
```

## 主要组件

React Router 中的组件主要分为三类：
* 路由器： `<BrowserRouter>` 和 `<HashRouter>`
* 路由匹配器： `<Route>` 和 `<Switch>`
* 导航：`<Link>`，`<NavLink>` 和 `<Redirect>`

### 路由器

每个 React Router 应用程序的核心应该是路由器组件。对于 Web 项目，`react-router-dom` 提供  `<BrowserRouter>` 和 `<HashRouter>` 路由器。两者的主要区别在于它们存储 URL 和 Web 服务器通信的方式。
* `<BrowserRouter>` 使用常规的 URL 路径。这些通常是外观最好的 URL，但是它们要求正确匹配服务器。具体来说，你的 Web 服务器需要在所有由 React Router 客户端管理的 URL 提供相同的页面。
* `<HashRouter>` 将当前位置存储在 URL 的 hash 一部分中，因此 URL 看起来像 `http://example.com/#/your/page`。由于哈希从不发送到服务器，因此这意味着不需要特殊的服务器配置。

要使用路由器，只需确保将其呈现在元素层次结构的根目录下即可。通常，您会将顶级 `<App>` 元素包装在路由器中，如下所示：

```jsx harmony
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <h1>Hello React Router</h1>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

### 路由匹配器

有两个路由匹配组件：`<Route>` 和 `<Switch>`。当 `<Switch>` 被渲染，它会搜索其 `children <Route>` 内容找到一个其 path 当前的 URL 匹配。当找到一个对象时，它将渲染该对象，`<Route>` 而忽略所有其他对象。

如果没有 `<Route>` 匹配项，则 `<Switch>` 呈现器不呈现任何内容（null）。

```jsx harmony
import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const About = () => <div>About</div>;

const Contact = (props) => <div>Contact params: {props.match.params.id}</div>;

const App = () => (
  <Router>
    <Switch>
      <Route path="/about" component={About}></Route>
      <Route path="/contact/:id" component={Contact}></Route>
    </Switch>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### 导航（或路由更改器）

React Router 提供了一个 `<Link>` 在应用程序中创建链接的组件。

`<NavLink>` 是一种特殊类型的 `<Link>`，会在匹配上当前 URL 的时候会给已经渲染的元素添加样式参数

`<Redirect>` 强制导航时使用

```jsx harmony
<div>
<Link to="/">Home</Link>
  {/*<a href="/">Home</a>*/}
  <NavLink to="/react" activeClassName="hurray">
    React
  </NavLink>
  
  {/*When the URL is /react, this renders:*/}
  {/*<a href="/react" className="hurray">React</a>*/}
  
  {/*When it's something else:*/}
  {/*<a href="/react">React</a>*/}
  <Redirect to="/login" />
</div>
```

## 代码拆分

为了提高访问速度，我们不必让访问者在使用前就下载整个应用程序。可以将代码拆分，动态导入需要加载的组件。将使用 `webpack`，`@babel/plugin-syntax-dynamic-import` 和 `loadable-components`

`webpack` 内置了对动态导入的支持；但是如果使用 Babel （例如，将JSX编译为JavaScript），则需要使用该 `@babel/plugin-syntax-dynamic-import` 插件。这是一个仅语法的插件，这意味着Babel不会进行任何其他转换。该插件仅允许 Babel 解析动态导入，因此 `webpack` 可以将它们捆绑为代码拆分。`.babelrc` 应该看起来像这样：

```
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

`loadable-components` 是用于通过动态导入加载组件的库。它自动处理各种边缘情况，并使代码拆分变得简单！

```jsx harmony
import React from 'react';
import loadable from "@loadable/component";
import Loading from "./Loading.js";


// fallback 加载中显示
const LoadableComponent = loadable(() => import("./Dashboard.js"), {
  fallback: <Loading />
});

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```

## 滚动恢复

### 滚动到顶部

```jsx harmony
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const crollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

在组件内部引用即可


## 相关API

### `<BrowserRouter>`

一个 `<Router>` 使用HTML5历史API（pushState，replaceState 和 popstate 事件），让您的 UI 同步与 URL。

```jsx harmony
/**
* basename: 基本名称(string)，所有位置的基本url。如果应用是从服务器的子目录提供的，则需要将其设置为子目录。格式正确的基本名称应以斜杠开头，但不能以斜杠结尾。
* 
* forceRefresh: (boolean)，如果 true 路由器将使用整页刷新页面导航。
* 
* getUserConfirmation: (func)，用于确认导航的功能。默认使用window.confirm。
* 
* keyLength: (number)，location.key 的长度，默认为6
*/
<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App />
</BrowserRouter>
```

### `<HashRouter>`

一个 `<Router>` 使用该URL（即哈希部分 window.location.hash），以确保您的 UI 同步与 URL。

> 哈希历史记录不支持 location.key 或 location.state。

```jsx harmony
/**
* basename: 基本名称(string)，所有位置的基本url。如果应用是从服务器的子目录提供的，则需要将其设置为子目录。格式正确的基本名称应以斜杠开头，但不能以斜杠结尾。
* 
* getUserConfirmation: (func)，用于确认导航的功能。默认使用window.confirm。
* 
* hashType：(string)，用于的编码类型 window.location.hash。可用值为："slash"(默认)，"noslash"，"hashbang"
*/
<HashRouter
  basename={optionalString}
  getUserConfirmation={optionalFunc}
  hashType={optionalString}
>
  <App />
</HashRouter>

```

### `<Link>`

应用程序的声明式，可访问的导航。

```jsx harmony
/**
* to: (string)，通过链接路径位置的路径名 ?后面是参数
*/
<Link to="/courses?sort=name"></Link>
```

```jsx harmony
/**
* to: (object)
*   -- pathname: 代表链接路径的字符串
*   -- search: 查询参数的字符串表示形式
*   -- hash: 要放入网址中的哈希，例如#a-hash
*   -- state
*/
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```

```jsx harmony
/**
* to: (fun) 当前位置作为参数传递给该函数，该函数应以字符串或对象的形式返回位置表示形式
*/
<Link to={location => `${location.pathname}?sort=name`} />
```

```jsx harmony
/**
* replace: (boolean) 当为时true，单击链接将替换历史记录堆栈中的当前条目，而不是添加新条目。 
*/
<Link to="/courses" replace />
```

### `<NavLink>`

特殊的 `<Link>`，它将在与当前 URL 匹配时将样式属性添加到呈现的元素。

```jsx harmony
/**
* activeClassName: (string) 元素处于活动状态时提供的类。默认给定的类是 active
* exact: 如果为 true，则仅当位置完全匹配时，才会应用活动的类/样式
*/
<NavLink to="/faq" exact activeClassName="selected">
  FAQs
</NavLink>
```

```jsx harmony
/**
* activeStyle: (string) 元素处于活动状态时应用于元素的样式
*/
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  FAQs
</NavLink>
```

### `<Redirect>`


渲染 `<Redirect>` 会导航至新位置。新位置将覆盖历史记录堆栈中的当前位置，就像服务器端重定向（HTTP 3xx）一样。

```jsx harmony
/**
* to: (string) 重定向到的URL。
*/
<Redirect to="/somewhere/else" />
```

```jsx harmony
/**
* to: (object) 
*   -- pathname 有效的 url 路径
*   -- search 参数
*   -- state 
*/
<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>
```

```jsx harmony
/**
* push: (boolean) 重定向会将新条目推入历史记录，而不是替换当前条目
*/
<Redirect push to="/somewhere/else" />
```

```jsx harmony
/**
* from: (string) 要重定向的路径
* exact: (boolean) from完全匹配
*/
<Switch>
  <Redirect exact from="/" to="/home" />
  <Route path="/home">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

### `<Route>`

路由组件是 React Router 中最重要的组件。它最基本的职责是在 `path` 与当前 URl 匹配时呈现一些 UI。

```jsx harmony
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Home = () => <div>Home</div>;
const NewsFeed = () => <div>NewsFeed</div>;

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/news">
        <NewsFeed />
      </Route>
    </div>
  </Router>,
  node
);
```

路线渲染方法
* `<Route component>`
* `<Route render>`
* `<Route children>`

#### `<Route component>`

渲染以后Route props 的三个父元素传递属性：
* match
* location
* history

仅在位置匹配时呈现 React 组件。

```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

const User = (props) => <h1>Hello {props.match.params.username}!</h1>;
  
ReactDOM.render(
  <Router>
    <Route path="/user/:username" component={User}></Route>  
  </Router>,
  document.getElementById("root")
);
```

当使用 component （而不是 render 或者 children）路由用于从给定组件 React.createElement 创建新的 React 元素时。这意味着如果为 component props 提供内联函数，则每次渲染会创建一个新组件。这回导致组件的卸载和新组建的安装，而不是更新现有组件。使用内联函数进行内联渲染时，请使用 render 或使用 children。

#### `<Route render>`

这允许方便的渲染和包装，不期望的重新安装。

可以传入一个在位置匹配时调用的函数，而不是使用 props 创建一个新的 React 元素 component。

```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

const User = () => <h1>Hello!</h1>;
  
ReactDOM.render(
  <Router>
    <Route path="/user/:username" render={() => <User />}></Route>  
  </Router>,
  document.getElementById("root")
);
```

::: warning 警告
`<Route component>` 优先级高，`<Route render>` 因此请不要在同一个中使用两者 `<Route>`。
:::

#### `<Route children>`

```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

const User = () => <h1>Hello!</h1>;
  
ReactDOM.render(
  <Router>
    <Route path="/user/:username" children={() => <User />}></Route>  
  </Router>,
  document.getElementById("root")
);
```

## props 传递属性

### history

#### history 对象通常具有以下属性和方法：

| 属性/方法名 | 类型 | 介绍 |
| --- | --- | ---|
| length | number | 历史堆栈中的条目数 |
| action | string | 当前动作（PUSH，REPLACE，或POP）|
| location | object | 当前位置 |

#### location 对象通常具有以下属性和方法：
| 属性/方法名 | 类型 | 介绍 |
| --- | --- | ---|
| pathname | string | URL 的路径 |
| search | string | URL 查询字符串 |
| hash | string | URL 哈希片段 |
| state | object | 特定于位置的状态，例如，push(path, state)当该位置被推入堆栈时。仅适用于浏览器和内存历史记录 |
| `push(path, [state])` | func | 将新条目推送到历史堆栈 |
| `replace(path, [state])` | func | 替换历史堆栈中的当前条目 |
| `go(n)` | func | 按n条目移动历史堆栈中的指针 |
| `goBack()` | func | 相当于 `go(-1)` |
| `goForward()` | func | 相当于 `go(1)` |
| `block(prompt)` | func | 防止导航 |

### location

位置代表应用程序现在的位置，您希望它去的位置，甚至是它的位置。它看起来像这样：

```
Route component as this.props.location
Route render as ({ location }) => ()
Route children as ({ location }) => ()
withRouter as this.props.location
```

### match

一个 match 对象包含有关如何信息 `<Route path>` 相匹配的URL。match 对象包含以下属性：
| 属性 | 类型 | 介绍 |
| --- | --- | --- |
| params | object | 从与路径的动态段对应的 URL 解析的键/值对 |
| isExact | boolean | true 如果整个URL匹配（没有尾随字符）|
| path | string | 用于匹配的路径模式。用于构建嵌套的 `<Route>` |
| url | string | URL的匹配部分。用于构建嵌套的 `<Link>` |


