# Generator

generator（生成器）是 ES6 标准引入的新的数据类型。一个 generator 看上去像一个函数，但可以返回多次。

先复习函数的概念，一个函数是一段完整的代码，调用一个函数就是传入参数，然后返回结果：

```js
function foo(x) {
  return x +x;
}
let r = foo(1);   // 调用foo函数
```

函数在执行过程中，如果没有遇到 `return` 语句（函数末尾没有 `return`，就是隐含的 `return undefined;`），控制器无法交回被调用的代码。

generator 跟函数很像，定义如下：

```js
function* foo(x) {
  yield x + 1;
  yield x + 2;
  return x + 3;
}
```

generator 和函数不同的是，generator 由 `function*` 定义（注意多出来的 `*` 号），并且，除了 `return` 语句，还可以用 `yield` 返回多次。

---

我们以一个著名的斐波那契数列为例，它由0，1开头：

```
0 1 1 2 3 5 8 13 21 34 ...
```

要编写一个产生斐波那契数列的函数，可以这么写：

```js
function fib(max) {
  let a = 0,
      b = 1,
      arr = [0, 1];
  while (arr.length < max) {
    [a, b] = [b, a + b];
    arr.push(b);
  }
  return arr;
}

// 测试:
fib(5); // [0, 1, 1, 2, 3]
fib(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

函数只能返回一次，所以必须返回一个 `Array`。但是，如果换成 generator，就可以一次返回一个数，不断返回多次。用 generator 改写如下：

```js
function* fib(max) {
  let a = 0,
      b = 1,
      n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n ++;
  } 
  return ;
}
```

直接调用试试：

```js
fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
```

直接调用一个 generator 和调用函数不一样，`fib(5)` 仅仅是创建了一个 generator 对象，还没有去执行它。

调用 generator 对象有两个方法，一是不断地调用 generator 对象的 `next()` 方法：

```js
const f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
```

`next()` 方法会执行 generator 的代码，然后，每次遇到 `yield x;` 就返回一个对象 `{value: x, done: trur/false}`，然后暂停。返回的 `value` 就是 `yield` 的返回值，`done` 表示这个 generator 是否已经执行结束了。如果 `done` 为 `true` ，则 `value` 就是 `return` 的返回值。

当执行 `done` 为 `true` 时，这个 generator 对象就已经全部执行完毕，不要再继续调用 `next()` 了。

第二个方法是直接用 `for...of` 循环迭代 generator 对象，这种方法不需要我们自己判断 `done`：

```js
function* fib(max) {
  let a = 0,
      b = 1,
      n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n ++;
  } 
  return ;
}

for (let x of fib(10)) {
  console.log(x);   // 依次输出0, 1, 1, 2, 3, ...
} 
```

## generator 的作用

因为 generator 可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个 generator 就可以实现需要用面向对象才能实现的功能。例如，用一个对象来保存状态，得这么写：

```js
const fib = {
  a: 0,
  b: 1,
  n: 0,
  max: 5,
  next: () => {
    let r = this.a,
        t = this.a + this.b;
    this.a = this.b;
    this.b = t;
    if(this.n < this.max) {
      this.n ++;
      return r;
    } else {
      return undefined;
    }
  }
}
```

用对象保存状态，相当繁琐。

generator 还有另一个巨大的好处，就是把异步回调代码变成“同步”代码

没有 generator 之前的黑暗时期，用 AJAX 时需要这么写代码：

```js
ajax("http://url-1", data1, function(err, result) {
 if (err) {
    return handle(err);
  }
 ajax("http://url-2", data2, function(err, result) {
   if(err) {
     return handle(err);
   }
   ajax('http://url-3', data3, function (err, result) {
     if (err) {
       return handle(err);
     }
     return success(result);
   })
 })
   
})
```

回调越多，代码越难看。

有了 generator 的美好时代，用 AJAX 时可以这么写：

```js
(function* () {
  try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
  } catch (err) {
    handle(err);
  }
})()
```

看上去是同步代码，实际执行是异步的。


