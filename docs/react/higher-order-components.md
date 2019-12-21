# React 高阶组件

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特征而形成的设计模式。

具体而言，**高阶组件是参数为组件，返回值为新组件的函数**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

HOC 在 React 的第三方库中很常见，例如 Redux 的 `connect` 和 Relay 的 `createFragmentContainer`。

高阶组件就是把一个组件传入，返回另外一个组件(简写 `@` )

```jsx harmony
import React from 'react';
// React Redux 的 `connect` 函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

// 简写
@connect(commentSelector, commentActions)
class CommentList extends React.Component {
  // ...  
}
```

高阶组件有两种：
* 属性代理
* 反向继承

```jsx harmony
import React from 'react';

/**
* 高阶组件是一个纯函数
* @param Comp 传入一个组件
* @returns {WrapComp} 返回一个新的组件
*/
const WrapperHello = (Comp) => {
  /**
  * 反向继承，在高阶组件内可以做额外的，或者多个组件共有的操作。注意：并不会改变原有组件
  */
  class WrapComp_ extends Compo {
    /**
    * 新增公共的操作
    */
    componentDidMount() {
      console.log('高阶组件新增的生命周期，加载完成')
    }
    render() {
      return <Comp></Comp>
    }
  }
  /**
  * 属性代理，添加额外的，公共的元素等。注意：并不会改变原有组件
  */
  class WrapComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date()
      }
    }
    render() {
      return (
        <div>
          {/* 新增加的属性元素 */}
          <p>这是HOC高阶组件特有的元素</p>
          {/* prop 属性值 不会发生改变，不改变原有组件内容 */}
          <Comp name='text' date={this.state.date} {...this.props}></Comp>
        </div>
      );
    }
  }
  
  /**
  * 返回的是一个新的组件
  */
  return WrapComp;
};

@WrapperHello
class Hello extends React.Component {
  render() {
    return <h3>hell imooc</h3>
  }
}
```

HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

不要试图在 HOC 中修改组件原型（或以其他方式改变它）

高阶组件的作用：代码的复用，逻辑的抽象，渲染和劫持。


::: warning 注意事项
* 不要在 render 方法中使用 HOC
* 务必复制静态方法
* Refs 不会被传递
:::
