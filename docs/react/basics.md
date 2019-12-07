# React 基础

## 介绍

### React 是什么？

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。

React 的核心思想是：封装组件。

各个组件维护自己的状态和 UI，当状态变更，自动重新渲染整个组件。

### React 特点
* 声明式设计：React 采用声明范式，可以轻松描述应用。
* 高效：React 通过对 DOM 的模拟，最大限度地减少与 DOM 的交互。
* 灵活：React 可以与已知的库或框架很好地配合。
* JSX：JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
* 组件：通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
* 单向响应的数据流：React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。


> React 大体包含下面这些概念：
> 
> * 组件
> * JSX
> * Virtual DOM
> * Data Flow

一个简单的组件

```jsx harmony
import React, { Component } from 'react';
import { render } from 'react-dom';

class HelloMessage extends Component {
  render() {
    return <div>Hello {this.props.name}</div>
  }
}

// 将组件到 DOM 元素 id = root
render(<HelloMessage name='John' />, document.getElementById('root'));
```

### 组件

React 应用都是构建在组件之上。

上面的 `HelloMessage` 就是一个 React 构建的组件，最后一句 `render` 会把这个组件显示在页面上的某个元素 `<div id='root'>` 里面，显示的内容就是 `<div>Hello John</div>`。

`props` 是组件包含的两个核心概念之一，另一个是 `state` （这个组件没用到）。可以把 `props` 看作是组件的配置属性，在组件内部是不变的，只是在调用这个组件的时候传入不同的属性（比如这里的 name）来定制显示这个组件。


