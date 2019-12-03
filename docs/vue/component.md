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




