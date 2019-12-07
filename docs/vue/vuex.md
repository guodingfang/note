# Vuex

## Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用了集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

以下是一个表示“单向数据流”理念的简单示意：

<img src='./images/flow.png' width="500">

* state：驱动应用的数据源
* view：以声明方式将 state 映射到视图
* actions：响应在 view 上的用户输入导致的状态变化

但是，当应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：
* 多个视图依赖于同一状态
* 来自不同视图的行为需要变更同一状态

这个时候，就需要将组件的共享状态抽取出来，以一个全局单例模式管理。在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为。

通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。

![vuex](./images/vuex.png)

## Store

每一个 Vuex 应用的核心就是 store（仓库）。`store` 基本上就是一个容器，它包含应用中大部分的**状态(state)**。Vuex 和单纯的全局对象有以下两点不同：
* Vuex 的状态存储是响应式的。当 Vue 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会得到高效更新。
* 不能直接改变 `store` 中的状态。改变 `store` 中的状态的唯一途径就是显示地**提交（commit）mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。


```js
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

可以通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更：

```js
store.commit('increment')

console.log(store.state.count) // -> 1
```

在这里，通过提交 mutation 的方式，而非直接改变 `store.state.count`，是因为我们想要更明确地追踪到状态的变化。

由于 `store` 中的状态是响应式的，在组件中调用 `store` 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 `methods` 中提交 `mutation`。

## State

### 单一状态树

Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 `store` 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

### 在 Vue 组件中获得 Vuex 状态

如何在 Vue 组件中展示状态呢？由于 Vue 的状态存储是响应式的，从 `store` 实例中读取状态最简单的方式就是在计算属性中返回某个状态：

```vue
<template>
  <div> {{ count }} </div>
</template>
<script>
  export default {
    computed: {
      count() {
        return store.state.count;
      }
    }
  }
</script>
```

每当 `store.state.count` 变化的时候，都会重新求取计算属性，并且触发更新相关联的 DOM。

然而，这种模式导致组件依赖全局状态单例。在模块构建系统中，在每个需要使用 `state` 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：

```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```
通过在根实例中注册 store 选项，该 `store` 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。让我们更新下 Counter 的实现：

```vue
<template>
  <div> {{ count}} </div>
</template>
<script>
  export default {
    computed: {
      count() {
        return this.$store.state.count;
      }
    }
  }
</script>
```

### `mapState` 辅助函数

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：

```vue
<template></template>
<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      localComputed () { /* ... */ },
      // 使用扩展运算符，可以和局部计算属性混合使用
      ...mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
          return state.count + this.localCount
        }  
      })
    }
  }
</script>
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

### 组件仍然保有局部状态

使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。

## Getter

有时候需要从 `store` 中的 `state` 中派生出一些状态，例如对列表进行过滤并计数：

```vue
<template></template>
<script>
  export default {
    computed: {
      doneTodosCount () {
        return this.$store.state.todos.filter(todo => todo.done).length
      }
    }
  }
</script>
```

如果有多个组件需要用到此属性，要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

Vuex 允许我们在 `store` 中定义 `getter`（可以认为是 store 的计算属性）。就像计算属性一样，`getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 `state` 作为其第一个参数：

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

### 通过属性访问

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也会接受其他 getter 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

```js
store.getters.doneTodosCount // -> 1
```

我们可以很容易地在任何组件中使用它：

```vue
<template></template>
<script>
  export default {
    computed: {
      doneTodosCount () {
        return this.$store.getters.doneTodosCount
      }
    }
  }
</script>
```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

### 通过方法访问

也可以通过让 getter 返回一个函数，来实现给 getter 传参。在对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

### `mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```vue
<template></template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters({
        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
          doneCount: 'doneTodosCount'
      })
    }
  }
</script>
```

## Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 `mutation`。Vuex 中的 `mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的 **事件类型（type）** 和一个 **回调函数（handler）**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

你不能直接调用一个 mutation handler。这个选项更像是事件注册：当触发一个类型为 increment 的 mutation 时，调用此函数。要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：

```js
store.commit('increment')
```

### 提交载荷（Payload）

你可以向 `store.commit` 传入额外的参数，即 mutation 的 载荷（payload）：

```js
// ...
const mutations = {
  increment (state, payload) {
    state.count += payload.amount
  }
};
```

```js
store.commit('increment', {
  amount: 10
})
```

### 对象风格的提交方式

提交 `mutation` 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 `mutation` 函数，因此 handler 保持不变：

```js
const mutations = {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

### Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
* 最好提前在你的 store 中初始化好所有所需属性
* 当需要在对象上添加新属性时，你应该：
  * 使用 `Vue.set(obj, 'newProp', 123)`, 或者
  * 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：`state.obj = { ...state.obj, newProp: 123 }`

### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

### Mutation 必须是同步函数

一条重要的原则就是要记住 mutation **必须是同步函数**。

### 在组件中提交 Mutation

可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 store）。

```vue
<template></template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
  
        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  }
</script>
```

### 下一步：Action

处理异步操作 使用 Action。

## Action

Action 类似于 mutation，不同在于：
* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同的办法和属性的 `context` 对象（ context 不是 store 实例本身），因为可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

### 分发 Action

Action 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment');
```

相比 mutation 必须同步执行，Action 就不受约束！我们可以在 action 内部执行异步操作：

```js
const actions = {
  incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000)
    }
}
```

Actions 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
});

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
});
```

### 在组件中分发 Action

在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 store）：

```vue
<template></template>
<script>
  import { mapActions } from 'vuex';
  export default {
    // ...
    methods: {
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
  
        // `mapActions` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ]),
      ...mapActions({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    }    
  }
</script>
```

### 组合 Action

利用 `aysnc/await`，可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

const actions = {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

具体信息查看[详情](https://vuex.vuejs.org/zh/guide/actions.html#%E7%BB%84%E5%90%88-action)

## Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
};

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
};

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
});

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

### 命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { /*...*/ } // -> getters['account/isAdmin']
      },
      actions: {
        login () { /*...*/ } // -> dispatch('account/login')
      },
      mutations: {
        login () { /*...*/ } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { /*...*/ } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { /*...*/ } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

启用了命名空间的 `getter` 和 `action` 会收到局部化的 `getter`，`dispatch` 和 `commit`。

#### 在带命名空间的模块内访问全局内容（Global Assets）

如果希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
const modules = {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { /*...*/ }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { /*...*/ }
    }
  }
}
```

#### 在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。例如：

```js {13}
const modules = {
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { /*...*/ } // -> 'someAction'
        }
      }
    }
  }
}
```

#### 带命名空间的绑定函数

当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```vue
<template></template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    computed: {
      ...mapState({
        a: state => state.some.nested.module.a,
        b: state => state.some.nested.module.b
      })
    },
    method: {
      ...mapActions([
        'some/nested/module/foo', // -> this['some/nested/module/foo']()
        'some/nested/module/bar', // -> this['some/nested/module/bar']()
      ])
    }
  }
</script>
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```js
export default {
  computed: {
    ...mapState('some/nested/module', {
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    ...mapActions('some/nested/module', [
      'foo', // -> this.foo()
      'bar' // -> this.bar()
    ])
  }
}
```

而且，可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

### 模块动态注册

具体详情[查看](https://vuex.vuejs.org/zh/guide/modules.html#%E6%A8%A1%E5%9D%97%E5%8A%A8%E6%80%81%E6%B3%A8%E5%86%8C)

### 模块重用

具体详情[查看](https://vuex.vuejs.org/zh/guide/modules.html#%E6%A8%A1%E5%9D%97%E9%87%8D%E7%94%A8)


## 项目结构

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
* 应用层级的状态应该集中到单个 store 对象中。
* 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
* 异步逻辑都应该封装到 action 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```sh
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

## 插件

具体内容查看[详情](https://vuex.vuejs.org/zh/guide/plugins.html)

## 严格模式

开启严格模式，仅需在创建 store 的时候传入 `strict: true`：

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

具体内容查看[详情](https://vuex.vuejs.org/zh/guide/strict.html)

## 表单处理

具体内容查看[详情](https://vuex.vuejs.org/zh/guide/forms.html)

## 测试

具体内容查看[详情](https://vuex.vuejs.org/zh/guide/testing.html)
