# Redux

## 介绍

### 动机

随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state （状态）。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

Redux 就是为了解决由于状态过多所造成的混乱、组件之间传递数据等更多数据状态方面的问题。


### 三大原则

Redux 可以用这三个基本原则来描述：

#### 单一数据源

整个应用的 state 被存储在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

#### State 是只读的

唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

#### 使用纯函数来执行修改

为了描述 action 如何改变 state tree，需要编写 reducers。

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

## 基础

### Action

Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。

```js
const ADD_TODO = 'ADD_TODO';
const action = {
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

Action 本质上是 JavaScript 普通对象。action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 `action`。

```js
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

除了 `type` 字段外，action 对象的结构完全由自己决定。不过应该尽量减少 action 中传递的数据。

#### Action 创建函数

Action 创建函数就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

在 Redux 中的 action 创建函数只是简单的返回一个 action:

```js
const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text
  }
}
```

这个时候，Redux 只需要将 action 创建函数的结果传给 `dispatch()` 方法既可发起一次 dispatch 过程：

```js
dispatch(addTodo(text))
```

store 里能直接通过 `store.dispatch()` 调用 `dispatch()` 方法，但是多数情况下你会使用 react-redux 提供的 `connect()` 帮助器来调用。`bindActionCreators()` 可以自动把多个 action 创建函数 绑定到 `dispatch()` 方法上。


### Reducer

Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的

> actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

#### 设计 State 结构

在 Redux 应用中，所以的 state 都被保存在一个单一对象中。

```js
const initialState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    { text: 'Consider using Redux', completed: true, },
    { text: 'Keep all state in a single tree', completed: false, }
  ]
}
```

#### Action 处理

在确定好 state 对象的结构，就可以开始发开 reducer。reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

`(previousState, action) => newState`

保持 reducer 纯净非常重要，永远不要在 reducer 里做这些操作：
* 修改传入参数
* 执行有副作用的操作，如 API 请求和路由跳转
* 调用非纯函数，如 `Date.now()` 或 `Math.random()`。

只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

```js
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
} from './actions';

const todoApp = (state = initialState, action) => {
  switch (action) {
    case ADD_TODO:
      return { ...state, todos: [ ...state.todos, ...action.newTodos ] };
    case TOGGLE_TODO:
      const todos = state.todos.map((todo, index) => index === action.index 
      ? { ...todo, completed: !todo.completed } : todo);
      return { ...state, todos };
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.filter };
    default:
      return state;
  }
}
```

注意：
1. 不要修改 state。要返回一个新的对象。
1. 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。


#### 拆分 Reducer

```js
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
} from './actions';

const todo = (state = [], action) => {
  switch (action) {
    case ADD_TODO:
      return [ ...state, ...action.newTodos ];
    case TOGGLE_TODO:
      return state.map((todo, index) => index === action.index 
                   ? { ...todo, completed: !todo.completed } : todo);
    default:
      return state;
  }
};

const todoApp = (state = initialState, action) => {
  switch (action) {
    case ADD_TODO:
      return { ...state, todos: todo(state.todos, action) };
    case TOGGLE_TODO:
      return { ...state, todos: todo(state.todos, action) };
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.filter };
    default:
      return state;
  }
}
```

注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。

随着应用的膨胀，还可以将拆分后的 reducer 放在不同的文件中，以保证其独立性并用于专门处理不同的数据域。

最后，Redux 提供了 `combineReducers()` 工具类：

```js
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  user,
  todos
});

export default todoApp
```

`combineReducers()` 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。

> **ES6 写法：**
> 
> `combineReducers()` 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，然后使用 `import * as reducers` 得到一个以它们名字作为 key 的 object：
>
> ```js
> import { combineReducers } from 'redux';
> import * as reducers from './reducers';
> 
> const todoApp = combineReducers(reducers)
> ```


### Store

Store 是把 action 和 reducers 联系在一起的对象。Store 有以下职责：
* 维持应用的 state
* 提供 `getState()` 方法获取 state
* 提供 `dispatch(action)` 方法更改 state
* 通过 `subscribe(listener)` 注册监听器

**Redux 应用只有一个单一的 store**。当需要拆分数据处理逻辑时，应该使用 reducer 组合而不是创建多个 store。

```js
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
});

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe();
```

### 数据流

**严格的单向数据流**是 Redux 架构的设计核心。

这意味着应用中所有的数据都遵循相同的生命周期，这样可以让应用变得更加可预测且容易理解。同时也鼓励做数据范式化，这样可以避免使用多个且独立的无法相互引用的重复数据。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

#### 第一步：调用 `store.dispatch(action)`。

Action 就是一个描述 “发生了什么” 的普通对象，比如：

```
{ type: 'LIKE_ARTICLE', articleId: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

你可以在任何地方调用 store.dispatch(action)，包括组件中、XHR 回调中、甚至定时器中。

#### 第二步：Redux store 调用传入的 reducer 函数。

Store 会把两个参数传入 reducer： 当前的 state 树和 action。例如，在这个 todo 应用中，根 reducer 可能接收这样的数据：

```js
// 当前应用的 state（todos 列表和选中的过滤器）
let previousState = {
  visibleTodoFilter: 'SHOW_ALL',
  todos: [
   {
     text: 'Read the docs.',
     complete: false
   }
  ]
};

// 将要执行的 action（添加一个 todo）
let action = {
  type: 'ADD_TODO',
  text: 'Understand the flow.'
};

// reducer 返回处理后的应用状态
let nextState = todoApp(previousState, action)
```

注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

#### 第三步：根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。

根 reducer 的结构完全由你决定。Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。

下面演示 `combineReducers()` 如何使用。假如你有两个 reducer：一个是 todo 列表，另一个是当前选择的过滤器设置：

```js
function todos(state = [], action) {
 // 省略处理逻辑...
 return nextState
}

function visibleTodoFilter(state = 'SHOW_ALL', action) {
 // 省略处理逻辑...
 return nextState
}

let todoApp = combineReducers({
 todos,
 visibleTodoFilter
})
```

当你触发 action 后，`combineReducers` 返回的 todoApp 会负责调用两个 reducer：

```js
let nextTodos = todos(state.todos, action);
let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);
```

然后会把两个结果集合并成一个 state 树：

```js
return {
  todos: nextTodos,
  visibleTodoFilter: nextVisibleTodoFilter
}
```

#### 第四步：Redux store 保存了根 reducer 返回的完整 state 树。

这个新的树就是应用的下一个 state！所有订阅 `store.subscribe(listener)` 的监听器都将被调用；监听器里可以调用 `store.getState()` 获得当前 state。

现在，可以应用新的 state 来更新 UI。

### 搭配 React

Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

尽管如此，Redux 还是和 React 这类库搭配起来用最好，因为这类库允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 变化。

Redux 默认并不包含 React 绑定库，需要单独安装。

```
npm install --save react-redux
```

#### 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

Redux 的 React 绑定库是基于 容器组件和展示组件相分离 的开发思想。

| —— | 展示组件 | 容器组件 |
| --- | --- | --- |
| 作用 | 描述如何展现（骨架、样式）| 描述如何运行（数据获取、状态更新） |
| 直接使用 Redux | 否 | 是 |
| 数据来源 | props | 监听 Redux state |
| 数据修改 | 从 props 调用回调函数 | 向 Redux 派发 actions |
| 调用方式 | 手动 | 通常由 React Redux 生成 |

大部分的组件都应该是展示型的，但一般需要少数的几个容器组件把它们和 Redux store 连接起来。

关于 容器组件 和 展示组件 详情[查看](https://www.redux.org.cn/docs/basics/UsageWithReact.html)

使用 React Redux 组件 `<Provider>`，可以让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

```jsx harmony
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## 高级

### 异步 Action


