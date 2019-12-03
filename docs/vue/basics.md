# Vue 基础

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

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以可以使用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。

不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

### 绑定 HTML Class

#### 对象语法

可以传给 `v-bind:class` 一个对象，以动态地切换 class：

```vue
<template>
  <div v-bind:class="{ active: isActive, 'text-danger': hasError  }"></div>
</template>
<script>
export default {
  data() {
    return {
      isActive: true,
      hasError: false,
    }
  }
}
</script>

```

当 isActive 或者 hasError 变化时，class 列表将相应地更新，例如，如果 hasError 的值为 true，class 列表将变为 "static active text-danger"。

绑定的数据对象不必内联定义在模板里：

```vue
<template>
  <div v-bind:class="classObject"></div>
</template>
<script>
  export default {
    data() {
      return {
        classObject: {
          active: true,
          'text-danger': false
        }
      }
    }
  }
</script>
```

结果与上面一样，也可以绑定一个返回对象的计算属性。

#### 数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 class 列表，使用方式与对象语法一样


### 绑定内联样式

#### 对象语法

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```vue
<template>
  <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
</template>
<script>
  export default {
    data() {
      return {
        activeColor: 'red',
        fontSize: 30
      }
    }
  }
</script>
```

与 class 一样，也可以直接绑定一个对象，这会让模板更清晰，同样也可以结合计算属性使用。

#### 数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 style 列表，使用方式与对象语法一样

#### 自动添加前缀

当 `v-bind:style `使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

## 条件渲染

### v-if

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

```vue
<h1 v-if="awesome">Vue is awesome!</h1>

<!--也可以用 v-else 添加一个“else 块”：-->
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no </h1>
```
#### 在 `<template>` 元素上使用 v-if 条件渲染分组

想同时切换多个元素，此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

`v-else` 指令表示 `v-if` 的 "else 块"，`v-else-if`，顾名思义，充当 v-if 的 "else-if 块"，可以连续使用：

```vue
<template>
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
</template>
```

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

#### 用 key 管理可复用的元素

[详情查看](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)

### v-show

另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：

```vue
<h1 v-show="ok">Hello!</h1>
```

不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS 属性 display。

> 注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`

### v-if 和 v-show

`v-if` 是 "真正" 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性**的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

### v-if 和 v-for 一起使用

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中消耗增加。详情[查看](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81)

## 列表渲染

具体内容[查看](https://cn.vuejs.org/v2/guide/list.html)


## 事件处理

具体内容[查看](https://cn.vuejs.org/v2/guide/events.html)

## 表单输入绑定

具体内容[查看](https://cn.vuejs.org/v2/guide/forms.html)


## 组件基础

具体内容[查看](https://cn.vuejs.org/v2/guide/components.html)
