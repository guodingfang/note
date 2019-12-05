# Vue 组件

## 组件注册

### 注册名

在注册一个组件的时候，始终需要给它一个名字。比如在全局注册的时候我们已经看到了：

```js
Vue.component('my-component-name', { /* ... */ })
```

该组件名就是 `Vue.component` 的第一个参数

#### 组件名大小写

定义组件名的方式有两种：

使用 kebab-case

```js
Vue.component('my-component-name', { /* ... */ })
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

使用 PascalCase

```js
Vue.component('MyComponentName', { /* ... */ })
```

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

### 全局注册

使用 `Vue.component` 来创建组件，这些组件就是**全局组件**。也就是说它们在注册之后可以用在任何创新的 Vue 根实例（new Vue）的模板中。

### 局部注册

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

这种情况，可以这样使用：

```vue
<template></template>
<script>
import ComponentA from './ComponentA.vue';

export default {
  components: {
    ComponentA
  },
  // ...
}
</script>
```

## Prop

### Prop 的大小写

HTML 中的特性名是大小写不敏感的，所以浏览器会把所以大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

```vue
<template>
  <h3>{{ postTitle }}</h3>
</template>
<script>
  export default {
    name: 'blog-post',
    props: ['postTitle'],
  }
</script>
```

```js
import BlogPOst from './blog-post';
Vue.component(BlogPOst.name, BlogPOst);
```

```vue
<template>
  <blog-post post-title="hello!"></blog-post>
</template>
```

### Prop 类型

```vue
<script>
  export default {
    props: {
      title: String,
      likes: Number,
      isPublished: Boolean,
    }
  }
</script>
```

### 传递静态或动态 Prop

```vue
<template>
  <!-- 静态 prop -->
  <blog-post title="My journey with Vue"></blog-post>
  <!-- 动态 prop -->
  <blog-post v-bind:title="post.title"></blog-post>
</template>
<script>
  export default {
    data() {
      return {
        post : { title: 'not React' }
      }
    }
  }
</script>
```

在上述两个示例中，传入的值都是字符串类型的，但实际上任何类型的值都可以传给一个 prop。

#### 传入一个数字

```vue
<template>
  <!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
  <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
  <blog-post v-bind:likes="42"></blog-post>
  
  <!-- 用一个变量进行动态赋值。-->
  <blog-post v-bind:likes="post.likes"></blog-post>
</template>
```

#### 传入一个布尔值

```vue
<template>
  <!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
  <blog-post is-published></blog-post>
  
  <!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
  <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
  <blog-post v-bind:is-published="false"></blog-post>
  
  <!-- 用一个变量进行动态赋值。-->
  <blog-post v-bind:is-published="post.isPublished"></blog-post>
</template>
```

#### 传入一个数组

```vue
<template>
  <!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
  <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
  <blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
  
  <!-- 用一个变量进行动态赋值。-->
  <blog-post v-bind:comment-ids="post.commentIds"></blog-post>
</template>
```

#### 传入一个对象

同理


#### 传入一个对象的所有属性

如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind (取代 v-bind:prop-name)。例如，对于一个给定的对象 post：

```vue
<template>
  <blog-post v-bind="post"></blog-post>
  <!-- 等价于 -->
  <blog-post
    v-bind:id="post.id"
    v-bind:title="post.title"
  ></blog-post>
</template>
<script>
  export default {
    data() {
      return {
        post: {
          id: 1,
          title: 'My Journey with Vue'
        }
      }
    }
  }
</script>
```

### 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但反过来则不行。这样会防止从子组件以为改变父组件的状态，从而导致应用的数据流向难以理解。

额外的，每次父组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着不应该在一个子组件内改变 prop。

这里有两种常见的试图改变一个 prop 的情形：

1. ***这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。** 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```vue
<script>
  export default {
    props: ['initialCounter'],
    data: function () {
      return {
        counter: this.initialCounter
      }
    }
  }
</script>
```

2. **这个 prop 以一种原始的值传入且需要进行转换。** 在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```vue
<script>
  export default {
    props: ['size'],
    computed: {
      normalizedSize: function () {
        return this.size.trim().toLowerCase()
      }
    }
  }
</script>
```

::: tip
注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。
:::

### Prop 验证

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```vue
<script>
  export default {
    props: {
      // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
      propA: Number,
      // 多个可能的类型
      propB: [String, Number],
      // 必填的字符串
      propC: {
        type: String,
        required: true
      },
      // 带有默认值的数字
      propD: {
        type: Number,
        default: 100
      },
      // 带有默认值的对象
      propE: {
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return { message: 'hello' }
        }
      },
      // 自定义验证函数
      propF: {
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
      }
    }
  }
</script>
```

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。

#### 类型检查

type 可以是下列原生构造函数中的一个：
* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol

### 非 Prop 的特性

详情[查看](https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84%E7%89%B9%E6%80%A7)


## 自定义事件

### 事件名

不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听的这个事件所用的名字。举个例子，如果触发一个 camelCase 名字的事件：

```js
this.$emit('myEvent')
```

则监听这个名字的 kebab-case 版本是不会有任何效果的：

```vue
<template>
  <!-- 没有效果 -->
  <my-component v-on:my-event="doSomething"></my-component>
</template>
```

不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent` ——导致 myEvent 不可能被监听到。

因此，**始终使用 kebab-case 的事件名**

### 自定义组件的 `v-model` <Badge text="2.2.0+ 新增" type="tip" />

一个组件的 `v-model` 默认会利用名为 `value` 和 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突：[查看](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

### 将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```vue
<template>
  <base-input v-on:focus.native="onFocus"></base-input>
</template>
```

查看[详情](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)

### .sync 修饰符 <Badge text="2.3.0+ 新增" type="tip" />

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”，不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。

```vue
<template>
  <text-document v-bind:title.sync="doc.title"></text-document>
</template>
```

## 插槽

### 插槽内容

Vue 实现了一套内容分发的 API，将 `<slot>` 元素作为承载分发内容的出口。

它允许你像这样合成组件：

```vue
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```
然后你在 `<navigation-link>` 的模板中可能会写为：

```vue
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
```

当组件渲染的时候，`<slot></slot>` 将会被替换成 “Your Profile”。插槽内可以包含任何模板代码，包括 HTML，甚至其他组件：

```vue
<template>
  <navigation-link url="/profile">
    <!-- 添加一个 Font Awesome 图标 -->
    <span class="fa fa-user"></span>
    Your Profile
  </navigation-link>
  
  <navigation-link url="/profile">
    <!-- 添加一个图标的组件 -->
    <font-awesome-icon name="user"></font-awesome-icon>
    Your Profile
  </navigation-link>
</template>
```

如果 `<navigation-link>` 没有包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。


### 编译作用域

::: tip
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
:::

### 后备内容

有时为一个插槽设置具体的后备（也就是默认的）内容是很有用的，它只会在没有提供内容的时候被渲染，例如在一个 `<submit-button>` 组件中：

```vue
<!--将后备内容放在 `<slot>` 标签内-->
<button type="submit">
  <slot>Submit</slot>
</button>
```

### 具名插槽

有时我们需要多个插槽。例如对于一个带有如下模板的 `<base-layout>` 组件，`<slot>` 元素有一个特殊的特性：`name`。这个特性可以用来定义额外的插槽：

```vue
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

一个不带 `name` 的 `<slot>` 出口会带隐含的名字"default"。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

```vue
<template>
  <base-layout>
    <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template>
  
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
    
    <!--仍然可以在一个 <template> 中包裹默认插槽的内容-->
    <template v-slot:default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>
    
    <template v-slot:footer>
      <p>Here's some contact info</p>
    </template>
  </base-layout>
</template>
```

现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。

注意 `v-slot` 只能添加在 `<template>` 上。

### 作用域插槽

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 `<current-user>` 组件：

```vue
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```

我们想让它的后备内容显示用户的名，以取代正常情况下用户的姓，如下：

```vue
<current-user>
  {{ user.firstName }}
</current-user>
```

然而上述代码不会正常工作，因为只有 `<current-user>` 组件可以访问到 `user` 而我们提供的内容是在父级渲染的。

为了让 `user` 在父级的插槽内容中可用，我们可以将 `user` 作为 `<slot>` 元素的一个特性绑定上去：

```vue
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

绑定在 `<slot>` 元素上的特性被称为**插槽 prop**。现在在父级作用域中，我们可以给 `v-slot` 带一个值来定义我们提供的插槽 prop 的名字：

```vue
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

在这个例子中，我们选择将包含所有插槽 prop 的对象命名为 `slotProps`，但你也可以使用任意你喜欢的名字。具体内容[查看](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)


### 具名插槽的缩写 <Badge text="2.6.0 新增" />

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`：

```vue
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

```vue
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

```vue
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

## 动态组件 & 异步组件

具体内容[查看](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)

## 处理边界情况

之后看~

具体内容[查看](https://cn.vuejs.org/v2/guide/components-edge-cases.html)


