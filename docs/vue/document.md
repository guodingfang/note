# Vue 文档

## 介绍

Vue 是一套构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计可以从底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。


## Vue 实例

### 生命周期图示

![生命周期](./images/lifecycle.png)


## 模板语法

### 插值

#### 文本

数据绑定最常见的形式就是使用 “Mustache” 语法 (双大括号) 的文本插值：

```vue
<span>Message: {{ msg }}</span>
```

Mustache 标签将会被替代为对应数据对象上 `msg` 属性的值。无论何时，绑定的数据对象上 `msg` 属性发生了改变，插值处的内容都会更新。

通过使用 `v-once` 指令，也能执行一次性地插值，当数据改变时，插值处的数据不会更新。但请留心这会影响到该节点上的其它数据绑定：

```vue
<span v-once>这个将不会改变: {{ msg }}</span>
```

#### 原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，需要使用 `v-html` 指令：

```vue
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

这个 span 的内容将会被替换成为属性值 rawHtml，直接作为 HTML —— 会忽略解析属性值中的数据绑定。

> 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。
>
> 请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

#### 特性

Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 `v-bind` 指令：

```vue
<div v-bind:id="dynamicId"></div>
```

#### 使用 JavaScript 表达式

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```vue
<div v-bind:id="'list-' + id"></div>
```

### 指令

指令 (Directives) 是带有 `v-` 前缀的特殊特性。

#### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示，例如：`v-bind` 指令可以用于响应式地更新 HTML 特性：

```vue
<a v-bind:href="url">...</a>
```

在这里 href 是参数，告知 `v-bind` 指令将该元素的 href 特性与表达式 url 的值绑定

另一个例子是 v-on 指令，它用于监听 DOM 事件：

```vue
<a v-on:click="doSomething">...</a>
```

#### 动态参数

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```vue
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```vue
<a v-on:[eventName]="doSomething"> ... </a>
```

#### 修饰符

修饰符 (modifier) 是以半角句号 `·` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如：`.prevent` 修饰符告诉 v-on 指令对于触发的事件调用 `event.preventDefault()`：

```vue
<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写

Vue 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：

#### v-bind 缩写

```vue
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

#### v-on 缩写

```vue
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

## 计算属性和侦听器

### 计算属性

在模板中放入太多的逻辑会让模板过重且难维护。例如：

```vue
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

所以，对于任何复杂逻辑，你都应当使用计算属性。

#### 基础例子

```vue
<template>
  <div>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  }
}
</script>
```

#### 计算属性缓存 vs 方法

我们可以在表达式中调用方法来实现同样的效果：

```vue
<template>
  <div>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  methods: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  }
}
</script>
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，**不同的是计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。

这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

#### 计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 **watch**。

```vue
<template>
  <div id="demo">{{ fullName }}</div>
</template>

<script >
  export default {
    data() {
      return {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      }
    },
    watch: {
      firstName(val) {
        this.fullName = val + ' ' + this.lastName
      },
      lastName(val) {
        this.fullName = this.firstName + ' ' + val
      }
    }
  }
</script>
```

相比计算属性，上面代码是命令式且重复。

#### 计算属性的 setter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```vue
<script>
  export default {
    computed: {
      fullName: {
        get() {
          return this.firstName + ' ' + this.lastName;
        },
        set() {
          const names = newValue.split(' ');
          this.firstName = names[0];
          this.lastName = names[names.length - 1];
        }
      }
    }
  }
</script>
```

## Class 与 Style 绑定


