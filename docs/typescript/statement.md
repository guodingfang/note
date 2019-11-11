# 变量声明

`let` 和 `const` 是 JavaScript 里相对比较新的变量声明方式。`let` 在很多方面与 `var` 是相似的，但是可以帮组避免在 JavaScript 里常见一些问题。`const` 是对 `let` 的一个增强，它能阻止对一个变量再次赋值。

因为 TypeScript 是 JavaScript 的超集，所以它本身就支持 `let` 和 `const`。

## var 声明

一直以来我们都是通过 `var` 关键字来定义 JavaScript 变量。

```ts
var a = 10;
```

这里定义了一个名为 `a` 值为 `10` 的变量

也可以在函数内部定义变量：

```ts
function f() {
  var messgae = "Hello World!";
  return message
}
```

### 作用域规则

`var` 声明有些奇怪的作用域规则。看下面的例子：

```ts
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```

变量 `x` 是定义在 `if` 语句里面，但是我们却能在语句的外面访问它。这是因为 `var` 声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问，包含它的代码块对此没有什么影响，有些人称此为 `var` 作用域或函数作用域。 函数参数也使用函数作用域。

这些作用域可能会引发一些错误。其中之一就是，多次声明同一个变量并不会报错：

```ts
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```

里层的 `for` 循环会覆盖变量 `i`，因为所有 `i` 都会引用相同的函数作用域内的变量。有经验的开发者们很清楚，这些问题可能在代码审查时漏掉，引发无穷的麻烦。

### 变量获取怪异之处

```ts
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

`setTimeout` 在若干毫秒后执行一个函数，并且在 `for` 循环结束后。`for` 循环结束后，`i` 的值为 10。所以当函数被调用的时候，它会打印出10

一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时 `i` 的值

```ts
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
```

## let 声明

除了名字不同外，`let` 和 `var` 的写法一致。主要区别不在语法上，而在语义。

```ts
let hello = "Hello!";
```

### 块作用域

当用 `let` 声明一个变量，它使用的是词法作用域或块级作用域。不同于使用 `var` 声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或 `for` 循环之外是不能访问到的。

```ts
function f(input: boolean) {
    let a = 100;

    if (input) {
        // 这里可以访问到a变量
        let b = a + 1;
        return b;
    }

    // 这里访问不到b变量
    return b;
}
```

在 `catch` 语句里声明的变量也具有同样的作用域规则

```ts
try {
  throw "oh no!";
} catch (e) {
  console.log("Oh well.");
}
// 这里访问不到e
console.log(e);
```


