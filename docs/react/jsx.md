# JSX

> 为什么要引入 JSX 这种语法?
>
> React 认为**组件**才是王道，而组件是和模板紧密关联的，组件模板和组件逻辑分离会让问题复杂化。
> 
> 所以就有了 JSX 这种语法，就是为了把 HTML 模板直接嵌入到 JS 代码里，这样就做到了模板和组件关联，但是 JS 不支持这种包含 HTML 的语法，所以需要通过工具将 JSX 编译输出成 JS 代码才能使用。

```jsx harmony
<a href="http://facebook.github.io/react/">Hello!</a>

// 用 JS 代码来写就成这样了：

React.createElement('a', {href: 'http://facebook.github.io/react/'}, 'Hello!')
```

可以通过 `React.createElement` 来构造组件的 DOM 树。第一个参数是标签名，第二个参数是属性对象，第三个参数是子元素。

一个包含子元素的例子：

```jsx harmony
const child = React.createElement('li', null, 'Text Content');
const root = React.createElement('ul', { className: 'my-list' }, child);
React.render(root, document.body);
```

对于常见的 HTML 标签，React 已经内置了工厂方法：

```jsx harmony
const root = React.DOM.ul(
  { className: 'my-list' },
  React.DOM.li(null, 'Text Content')
);
```

所以 JSX 和 JS 之间的转换也很简单直观，用 JSX 的好处就是它基本上就是 HTML，对于构造 DOM 来说我们更熟悉，更具可读性。

## 使用 JSX

利用 JSX 编写 DOM 结构，可以利用原生的 HTML 标签，也可以像普通标签一样引用 React 组件。这两者约定通过大小写来区分，小写的**字符串**是 HTML 标签，大写开头的**变量**是 React 组件。

### 使用 HTML 标签：

```jsx harmony
import React from 'react';
import { render } from 'react-dom';

const myDivElement = <div className="foo" />;

render(myDivElement, document.getElementById('root'));
```

HTML 里的 `class` 在 JSX 里要写成 `className`，因为 `class` 在 JS 里是保留关键字。同理某些属性比如 `for` 要写成 `htmlFor`。

### 使用组件：

```jsx harmony
import React from 'react';
import { render } from 'react-dom';
import MyComponent from './MyComponent';

const myElement = <MyComponent someProperty={true} />
render(myElement, document.body);
```

### 使用 JavaScript 表达式

属性值使用表达式，只要用 `{}` 替换 `""`：

```jsx harmony
let person = '';
// 输入 (JSX):
person = <Person name={window.isLoggedIn ? window.name: ''} />;
// 输出 (JS):
person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
)
```

### 注释

在 JSX 里使用注释也很简单，就是沿用 JavaScript，唯一要注意的是在一个组件的子元素位置使用注释要用 `{}` 包起来。

```jsx harmony
const content = (
  <Nav>
    {/* child comment, put {} around */}
    <Person
      /* multi
         line
         comment */
      name={window.isLoggedIn ? window.name : ''} // end of line comment
    />
  </Nav>
);
```

### 自定义 HTML 属性

如果在 JSX 中使用的属性不存在于 HTML 的规范中，这个属性会被忽略。如果要使用自定义属性，可以用 `data-` 前缀。

可访问性属性的前缀 `aria-` 也是支持的。

## 属性扩散

有时候需要给组件设置多个属性，但是不想一个个写下这些属性，或者有时候甚至不知道这些属性的名称，这时候 spread attributes 的功能就很有用了。

例如：

```jsx harmony
const props = {
  foo: x,
  bar: y,
};

const component = <Component {...props} />
```

`props` 对象的属性会被设置成 `Component` 的属性。

属性也可以被覆盖：

```jsx harmony
const props = { foo: 'default' };

const component = <Component {...props} foo={'override'} />
console.log(component.props.foo); // 'override'
```

写在后面的属性值会覆盖前面的属性。

## JSX 与 HTML 的差异

除了前面提到的 class 要写成 className，比较典型的还有：
* `style` 属性接受由 CSS 属性构成的 JS 对象
* `onChange` 事件表现更接近我们的直觉（不需要 onBlur 去触发）
* 表单的表现差异比较大，要单独再讲
