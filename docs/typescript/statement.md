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

拥有块级作用域的变量的另一个特点是，它们不能被声明之前读或写。虽然这些变量始终“存在”于它们的作用域里，但在直接声明它的代码之前的区域都属于暂时性死区。它只是说明我们不能再 `let` 语句之前访问它们，幸运的是 TypeScript 可以告诉我们这些信息。

```ts
a++;      // illegal to use 'a' before it's declared;
let a;
```

注意一点，我们仍然可以在一个用于块级作用域变量被声明之前获取它。只是不能再变量声明之前去调用这个函数。 如果生成代码目标为 ES2015，现代的运行时会抛出一个错误；然而，现今 TypeScript 是不会报错的。

```ts
function foo() {
  // okay to capture 'a'
  return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a;
```

### 重定义及屏蔽

我们提过使用 `var` 声明时，它不在乎你声明多少次，你只会得到一个

```ts
function f(x) {
  var x;
  var x;

  if (true) {
    var x;
  }
}
```

上面的的例子里，所以 `x` 的声明实际上都引用一个相同的 `x`，并且这是完全有效的代码。这经常是 bug 的来源。好的是，`let` 声明不会这样宽松了。

```ts
let x = 10;
let x = 20;     // 错误，不能在1个作用域里多次声明`x`
```

### 块级作用域变量的获取

直观的来讲，每次进入一个作用域时，它创建了一个变量的环境。就算作用域代码已经执行完毕，这个环境与其捕获的变量仍然存在。

```ts
function theCityThatAlwaysSleeps() {
  let getCity;

  if (true) {
    let city = "Seattle";
    getCity = function() {
        return city;
    }
  }

  return getCity();
}
```

因为我们已经在 `city` 的环境里获取到了 `city`，所以就算 `if` 语句执行之后我们仍然可以访问它。

之前的 `setTimeout` 的例子，最后需要立即执行的函数表达式来获取每次 `for` 循环迭代里的状态。 实际上，我们做的是为获取到的变量创建了一个新的变量环境。 这样做挺痛苦的，但是幸运的是，你不必在TypeScript里这样做了。

当 `let` 声明出现在循环体里时拥有完全不同的行为。不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域。这就是我们每次立即执行函数表达式时做的事，所以在 `setTimeout` 例子里我们仅使用 `let` 声明就可以了。

```ts
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}
```

## const 声明

`const` 声明是声明变量的另一种方式

```ts
const numLivesForCat = 9;
```

它们与 `let` 声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。换句话说，它们拥有与 `let` 相同的作用域规则，但是不能对它们重新赋值。

这很好理解，它们引用的值是不可变的。

```ts
const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
}

// Error
kitty = {
  name: "Danielle",
  numLives: numLivesForCat
};

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```

除非使用特殊的方法去避免，实际上 `const` 变量内部状态是可修改的。幸运的是，TypeScript 允许你将对象的成员设置成只读的。

### let vs const

现在我们有两种作用域相似的声明方式，我们自然会问到底应该使用哪个。 与大多数泛泛的问题一样，答案是：依情况而定。

使用最小特权原则，所有变量除了你计划去修改的都应该使用 const。基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 const 也可以让我们更容易的推测数据的流动。


## 解构

### 解构数组

最简单的解构莫过于数组的解构赋值了：

```ts
let input = [1, 2];
let [first, second] = input;
console.log(first); // 1
console.log(second); // 2
```

这创建了2个命名变量 `first` 和 `second`。相当于使用了索引，但更为方便：

```ts
first = input[0];
second = inpit[1];
```

结构作用于已声明的变量会更好：

```ts
// 交换数据的值
[first, second] = [second, first];
```

作用于函数参数：

```ts
function f([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}
f(input);
```

你可以在数组里使用 `...` 语法创建剩余变量：

```ts
let [first, ...rest] = [1, 2, 3, 4];
console.log(first);     // 1
console.log(rest);      // [2, 3, 4]
```

当然，由于是 JavaScript，你可以忽略你不关心的尾随元素：

```ts
let [first] = [1, 2, 3, 4];
console.log(first); // 1
```

或其它元素：

```ts
let [, second, , fourth] = [1, 2, 3, 4];
```

### 对象解构

也可以解构对象：

```ts
let o = {
  a: "foo",
  b: 12,
  c: "bar"
}
let { a, b } = o;
```

这里通过 `o.a` 和 `o.b` 创建了 `a` 和 `b`。注意不需要 `c` 可以忽略它。

你可以在对象里使用 `...` 语法创建剩余变量：

```ts
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```

#### 属性重命名

可以给属性以不同的名字：

```ts
let { a: newName1, b: newName2 } = o;
```

可以将 `a: newName1` 读作 `a` 作为 `newName1`。方向是从左到右，好像你写成了以下样子：

```ts
let newName1 = o.a;
let newName2 = o.b;
```

这里的冒号不是指示类型的。 如果你想指定它的类型， 仍然需要在其后写上完整的模式。

```ts
let { a, b }: { a: string, b: number } = o;
```

#### 默认值

默认值可以让你在属性为 undefined 时使用缺省值：

```ts
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}
```

现在，即使 b 为 undefined，keepWholeObject 函数的变量 wholeObject 的属性 `a` 和 `b` 都会有值。

### 函数声明

解构也能用于函数声明。看以下简单的情况：

```ts
type C = { a: string, b?: number }
function f({ a, b }: C): void {
  // ...
}
```

但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。

```ts
function f({ a, b } = { a: "", b: 0 }): void {
    // ...
}
f(); // ok, default to { a: "", b: 0 }
```

## 展开

展开操作符正与解构相反。它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。例如：

```ts
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
```

这会令 `bothPlus` 的值为 `[0, 1, 2, 3, 4, 5]`。展开操作创建了 `first` 和 `second` 的一份浅拷贝。它们不会被展开操作所改变。

还可以展开对象：

```ts
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法：

```ts
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p;    // ok
clone.m();  // error!
```

其次，TypeScript编译器不允许展开泛型函数上的类型参数。
