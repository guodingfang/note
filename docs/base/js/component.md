# 前端组件化

## 什么是前端组件化开发

组件化之前，写一个页面，需要将几百行、甚至上千行代码逻辑写在一个 js 文件中的情况。通常这种代码都很难读下去，更别说要维护起来，添加新功能，移除一些老功能了，因为你不知道改动一个地方，会不会出现意想不到的 bug。

这个时候，就需要利用组件化开发，拆分功能，封装组件，单独维护。


现代化前端框架通常都实现 MVVM 的方案，数据层（M）和 视图层（V）互相连接，同时变更，使得页面交互保持高度的一致性。

前端组件化开发，就是把页面的某一部分独立出来，划分这个一部分的 数据层（M）、视图层（V）和 控制层（C）用黑盒子的形式全部封装到一个组件内，暴露出一些开箱即用的函数和属性提供外部组件调用。

一个前端组件，包含了 HTML、CSS、JavaScript，包含了组件的模板、样式和交互等内容，基本组件的所有内容，外部只要按组件设定的属性、函数及事件处理等进行调用即可，完全不用考虑组件的内部实现逻辑，对外部来说，组件是一个完全的黑盒。

> 组件可以多层封装，通过调用多个小组件，最后封装成一个大组件，供外部调用。
>
> 比如：一个 Input 输入框 是一个组件，一个 Select 下拉选择框 也是一个组件，可以用 form 在这两个组件上包装一层，就是一个 Form 的组件。

有一些比较常用的前端组件，像 vue-router，vuex，react-router，redux，mobx 等，都是基于 Vue 和 React 的组件，它们只专注于 路由、状态存储 的工作，并且把这些事情做好。

只要利用好组件化开发，开发一个页面，就像搭积木一样，见各个组件拼接到一起，最后融合到一起，就是一个完整的系统。

## 组件化开发的优点

说到底，前端的组件化开发，可以很大程度上降低系统各个功能的耦合性，并且提高了功能内部的聚合性。这对前端工程化及降低代码的维护来说，是有很大的好处的。

耦合性的降低，提高了系统的伸展性，降低了开发的复杂度，提升开发效率，降低开发成本。

## 怎么设计一个组件

### 专一

要想设计一个好的组件，组件也需要专一。

设计组件要遵循一个原则：一个组件只专注做一件事，且把这件事做好。

一个功能入如果可以拆分成多个功能点，那就可以将每个功能点封装成一个组件，当然也不是组件的颗粒度越小越好，只要将一个组件内的功能和逻辑控制在一个可控的范围内即可。

举个例子。页面上有一个 Table 列表和一个分页控件，就可以将 Table 封装为一个组件，分页控件 封装成一个组件，最后再把 Table组件 和 分页组件 封装成一个组件。Table 组件还可以再拆分成多个 table-column 组件，及展示逻辑等。

### 可配置性

一个组件，要明确它的输入和输出分别是什么。

要做可配置性，最基本的方式是通过属性向组件传递配置的值，而在组件初始化的声明周期内，通过读取属性的值做出对应的显示修改。

还有一些方法，通过调用组件暴露出来的函数，向函数传递有效的值；修改全局 CSS 样式；向组件传递特定事件，并在组件内监听该事件来执行函数等。

在做可配置性时，为了让组件更加健壮，保证组件接收到的是有效的属性、函数接收到的是有效的参数，需要做一些校验。

#### 1.属性的值的校验

对属性的值进行校验，一般要考虑以下几个方面。

* 属性值的类型是否是有效的。如果某个属性要求传递一个数组，那么传递过来的值不是数组时，就要抛出异常，并给出对应的提示。

* 属性是否是必填的。有的属性的值，是组件内不可缺少的时，就要是必填的，在组件初始化时要做是否传递的检查，如果没有传递，则需要抛出异常，并给出相应的提示。如果属性不是必填的，可以设定一个默认值，当属性没有被设置时，就使用默认值。

在 React 中进行类型检查：

```jsx
import React, { Component, PropTypes } from 'react';

export default class Title extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    const { title } = this.props;

    return (
      <p>{ title }</p>
    )
  }
} 
```

在 Vue 中进行类型检查：

```vue
<template>
  <p>{{ title }}</p>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script> 
```

#### 2.函数的参数的校验

函数的参数校验，只要按照传统的方法进行校验即可。在函数内部顶部判断参数的值和类型，如果不满足要求，则抛出异常，并给出相应的提示。

```jsx
// ES6 语法
changeTitle(title) {
  if (typeof title !== 'string') {
    throw new Error('必须传入一个 title，才能修改 title。')
  }
  // 满足条件，可以进行修改
  this.title = title   // vue 语法
  this.setState({      // react 语法，修改state的值
    title
  })
}
```

### 生命周期

一个组件，需要明确知道在生命周期的不同阶段做该做的事。

初始化阶段，读取属性的值，如果需要做数据和逻辑处理的话，在这个阶段进行。

属性值变化时，如果属性发生变化，且需要对变化后的数据进行处理的话，在这个阶段进行处理。

组件销毁阶段，如果组件已经创建了一些可能会对系统产生一些副作用的东西，可以在这个阶段进行清除。比如 timeInterval、timeout 等。

如果组件在渲染的时候报错，需要展示错误信息。React v16 中提供了 componentDidCatch 生命周期函数，Vue v2.5 中提供了 errorCaptured 的钩子函数。

React 中提供了一些生命周期函数：
* componentWillMount
* componentDidMount
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* componentDidUpdate
* render
* componentWillUnmount
* componentDidCatch(React v16)

Vue 中提供了一些生命周期函数：
* beforeCreate
* created
* beforeMount
* mounted
* beforeUpdate
* updated
* beforeDestroy
* destroyed
* errorCapture
* errorCaptured(Vue v2.5)

### 事件传递

**Vue 中事件传递**

Vue 中传递事件很简单，只需要在子组件内使用 `this.$emit('event1')` 即可向外传递一个事件 `event1`，在父组件调用该子组件时，只需要监听 `event1` 事件，并给出对应事件处理逻辑即可。

Vue 子组件定义 child-component.vue

```vue
<template>
  <button @click="click">点击</button>
</template>

<script>
  export default {
    mounted: {
      click() {
        this.$emit('event1', 'This is a event.')
      }  
    }
  }
</script> 
```

Vue 父组件调用子组件

```vue
<template>
  <div>
    <child-component @event1="eventHandler" />
  </div>
</template>
 
<script>
  import childComponent from './child-component'
  export default {
    components: {
      childComponent
    },
    methods: {
      eventHandler(event) {
        console.log(event)
      }
    }
  }
</script> 
```

**React 中事件传递**

而在 React 中，官方没有给出组件间的事件传递解决方案，这也是 React 中比较坑的一点。不过，还是可以使用其他方式来实现。

React 中，父组件可以使用 props 向子组件传值，而子组件向父组件传值，需要在 **父组件内定义函数并通过属性传递给子组件，在子组件内通过调用该属性对应的函数，传入参数，传递给父组件内的函数，并在父组件的该函数中做逻辑的处理**。

React 子组件定义 child-component.js

```jsx
import React from 'react';

class ChildComponent extends React.Components {
  render() {
    return (
      <button onClick={ 
        () => {
          this.props.clickHandler('This is a click')
        }
      }></button>
    )
  }
} 
```

React 父组件调用子组件

```jsx
import React from 'react';
import ChildComponent from './child-component';
class ParentComponent extends React.Components {
  clickHandler(message) {
    console.log(message)
  }
 
  render() {
    return (
      <child-component 
        clickHandler={ this.clickHandler.bind(this) } 
        />
    )
  }
} 
```
