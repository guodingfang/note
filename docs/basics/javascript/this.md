# this

> 关于this的取值，分为8种情况

## 情况1：全局&调用普通函数

在全局环境中，this永远指向window。

```js
console.log(this === window);     // true
```

普通函数在调用时（注意不是构造函数，前面不加nwe），其中this也是指向window。

但是如果在严格模式下调用的话就会报错：

```js
"use strict"
const x = 10;
function foo() {
  console.log(this);        // undefined
  console.log(this.x);      // Uncaught TypeError: Cannot read property 'x' of undefined
}
```

## 情况2：构造函数

所谓构造函数就是由一个函数new出来的对象，一般构造函数的函数首字母大写，例如Object，Function，Array这些都属于构造函数。

```js
function Foo() {
  this.x = 10;
  console.log(this);      // Foo {x: 10}
}
const foo = new Foo();
console.log(foo.x);       // 10
```

上诉代码，如果函数作为构造函数使用，那么其中的this就代表它即将new出来的对象。

但是如果直接调用Foo函数，而不是使用new Foo()，那么就会变成情况1，这时候Foo()就变成普通函数。

```js
function Foo() {
  this.x = 10;
  console.log(this);      // Window
}
const foo = Foo();
console.log(foo.x);       // undefined
```

## 情况3：对象方法

如果函数作为对象的方法时，方法中的this指向该对象。

```js
const obj = {
  x: 10,
  foo: function() {
    console.log(this);        // Object
    console.log(this.x);      // 10
  }
};
obj.foo();
```

注意：如果在对象方法中定义函数，那么情况就不同了。

```js
const obj = {
  x: 10,
  foo: function() {
    function f() {
      console.log(this);      // Window
      console.log(this.x);    // undefined
    }
    f();
  }
};
obj.foo();
```

> 可以这样理解：函数f虽然在obj.foo内定义的，但它仍然属于一个普通函数，this仍指向window。

在这里，如果调用上层作用域中的变量obj.x，可以使用self缓存外部this变量。

```js
const obj = {
  x: 10,
  foo: function() {
    const self = this;
    function f() {
      console.log(self);      // Object
      console.log(self.x);    // 10
    }
    f();
  }
};
obj.foo();
```

如果foo函数不作为函数对象方法被调用：

```js
const obj = {
  x: 10,
  foo: function() {
    console.log(this);        // Window
    console.log(this.x);      // undefined
  }
};
const fn = obj.foo;
fn();
```

obj.foo被赋予一个全局变量，并没有作为obj的一个属性被调用，那么此时this的值是window。

## 情况4：构造函数prototype属性

```js
function Foo() {
  this.x = 10;
}
Foo.prototype.getX = function() {
  console.log(this);        // Object
  console.log(this.x);      // 10
};
const foo = new Foo();
foo.getX();
```

在Foo.prototype.getX函数中，this指向的foo对象。不仅仅如此，即使在整个原型链中，this代表的也是当前对象的值。

## 情况5：函数用call、apply或者bind调用

```js
const obj = {
  x: 10,
};

function foo() {
  console.log(this);        // Object
  console.log(this.x);      // 10
}

foo.call(obj);
foo.apply(obj);
foo.bind(obj)();
```

当一个函数被call、apply或者bind调用时，this的值就取传入对象的值。

## 情况6：DOM event this

在一个HTML DOM事件处理程序里，this始终指向这个处理程序所绑定的HTML DOM节点：

```js
function Listener() {
  // 这里的this指向 Listener 这个对象
  document.getElementById('foo').addEventListener('click', this.handleClick);
}
Listener.prototype.handleClick = function (event) {
    console.log(this);        // <div id='foo'></div>
};
const listener = new Listener();
document.getElementById('foo').click();
```

相当于给函数传值，使handleClick运行时上下文改变了，相当于下面的代码：

```js
const obj = {
  x: 10,
  fn: function() {
    console.log(this);        // Window
    console.log(this.x);      // undefined
  }
};

function foo(fn) {
  fn();
}
foo(obj.fn);
```

可以通过bind切换上下文：

```js
function Listener() {
    document.getElementById('foo').addEventListener('click', this.handleClick.bind(this));
}
Listener.prototype.handleClick = function (event) {
    console.log(this);            // Listener {}
};
const listener = new Listener();
document.getElementById('foo').click();
```

:::tip
前六种情况总结为一句话为：this指向调用该方法的对象。
:::

## 情况7：箭头函数中的this

当使用箭头函数的时候，情况就有所不同了：箭头函数的语法作用域，由上下文确定。

```js
const obj = {
  x: 10,
  foo: function() {
    const fn = () => {
      console.log(this);        // {x: 10, foo: ƒ}
      console.log(this.x);      // 10
    };
    fn();
  }
};
obj.foo();
```

现在，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj。

如果使用箭头函数，一起的这种hack写法：`const self = this;`就不需要了。

```js
const obj = {
  x: 10,
  foo: function() {
    const fn = () => {
      console.log(this);        // {x: 10, foo: ƒ}
      console.log(this.x);      // 10
    };
    fn.bind({x: 14})();
    fn.call({x: 14});
  }
};
obj.foo();
```

由于this在箭头函数中已经按照词法作用域绑定了，所以，用 `call()` 或者 `apply()` 调用箭头函数时，无法对 this进行绑定，即传入的第一个参数被忽略。


