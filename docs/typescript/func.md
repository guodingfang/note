# 函数

## 介绍

函数是 JavaScript 应用程序的基础。它帮助你实现抽象层，模拟类，信息隐藏和模块。在 TypeScript 里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用。

## 函数

和 JavaScript 一样，TypeScript 函数可以创建有名字的函数和匿名函数。可以随意选择适合应用程序的方式，无论是定义一系列的API函数还是只使用一次的函数

通过下面的例子可以快速回想起这两种 JavaScript 中的函数：

```ts
function add(x, y) {
  return x + y;
}

let myAdd = function(x, y) { return x + y; };
```

在 JavaScript 里，函数可以使用函数体外部的变量。当函数这样做时，我们说它捕获了这些变量。

```ts
let z = 100;
function addToZ(x, y) {
  return x + y + z;
}
```

## 函数类型

### 为函数定义类型

让我们为上面那个函数添加类型：

```ts
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TypeScript 能够根据返回值自动判断返回的类型，因此我们通常忽略它。

### 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

```ts
let myAdd: (x:number, y:number) => number =
    function(x: number, y: number): number { return x + y; };
```

函数类型包含两部分：参数类型和返回值类型。当写出完整的函数类型的时候，这两部分都是需要的。我们以参数列表的形式写出参数类型，为每一个参数指定一个名字和类型。这个名字只是为了增加可读性。也可以这样写：

```ts
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

第二部分是返回值类型。对于返回值，我们在函数和返回值类型之前使用（`=>`） 符号，使之清晰明了。如之前提到的，返回值类型是函数类型的必要部分，如果函数没有任何返回值，你也必须指定返回值类型为 `void` 而不能留空。

函数的类型只是由参数类型和返回值组成的。函数中使用的捕获变量不会体现在类型里。实际上，这些变量是函数的隐藏状态并不是组成 API 的一部分。

### 推断类型

判断这个例子的时候，你会发现如果你在赋值语句的一段指定了类型而另一边没有类型的话，TypeScript 编辑器会自动识别出类型：

```ts
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型。

## 可选参数和默认参数

TypeScript 里的每个函数参数都是必须的。这不是指不能传递 `null` 或 `undefined` 作为参数，而是说编辑器检测用户是否为每个参数都传入了值。编辑器还会假设只有这些参数会被传递进函数。简短的说，传递给一个函数的参数必须与函数期望的参数个数一致。

```ts
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```

JavaScript 里，每个参数都是可选的，可传可不传。没有传递的时候，它的值就是 `undefined`。在 TypeScript 里 我们可以在参数名旁使用 `?` 实现可选参数的功能。

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

可选参数必须跟在必需参数后面。

在 TypeScript 里，我们也可以为参数提供一个默认值当用户没有传递这个参数或者传递的值是 `undefined` 时。它们叫做有默认初始化值的参数。让我们修改上例，把 last name 的默认值设置为 "Smith"。

```ts
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```

在所以必须参数后面的带默认值初始化的参数都是可选的，与可选参数一样，在调用函数时可以省略。也就是说可选参数与末尾的默认参数共享参数类型。

```ts
function buildName(firstName: string, lastName?: string) {
    // ...
}

/**
 * 和
 **/

function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```

共享同样的类型 `(fisrtName: string, lastName?: string) => string`。默认参数的默认值取消了，只保留了它一个可选参数的信息。

与普通可选参数不同的时，带默认值的参数不需要放在必须参数后面。如果带默认值的参数出现在必须参数前面，用户必须传递明确的 `undefined` 值来获得默认值。 例如，我们重写最后一个例子，让 `firstName` 是带默认值的参数：

```ts
function buildName(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```

## 剩余参数

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。有时，你想同时操作多个参数，或者你并不知道会有多少个参数传递进来。在 JavaScript 里，可以使用 `arguments` 来访问所有传入的参数。

在 TypeScript 里，可以把所以参数收集到一个变量里：

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

剩余参数会被当做数量不限的可选参数。可以一个都没有，同样也可以有任意个。编辑器创建参数数组，名字是在省略号（`...`）后面给定的名字，可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

## this

### this 和箭头函数

JavaScript 里，`this` 的值在函数被调用时候才会指定。这个既强大又灵活的特点，但是你需要花时间弄清楚函数调用的上下文是什么。但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

下面看一个例子：

```ts
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return {suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

可以看到 `createCardPicker` 是个函数，并且它又返回了一个函数。如果我们尝试运行这个程序，会发现并没有弹出对话框而是报错了。因为 `createCardPicker` 返回的函数里的 `this` 被设置成了 `window` 而不是 `deck` 对象。因为我们只是独立的调用了 `cardPicker()`。顶级的非方法式调用会将 `this` 视为 `window`。（注意：在严格模式下，`this` 为 `undefined` 而不是 `window`）。

为了解决这个问题，我们可以在函数被返回时就绑定好正确的 `this`。这样的话，无论之后怎么使用它，都会引用绑定的 `deck` 对象。我们需要改变函数表达式来使用 ECMAScript6 箭头语法。箭头函数能保存函数创建是的 `this` 值，而不是调用时的值：

```ts
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return {suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

现在 TypeScript 知道 `createCardPicker` 期望在某个 `Deck` 对象上调用。也就是说 `this` 是 `Deck` 类型的，而非 `any`，因此 `--noImplicitThis` 不会报错了。

### 回调函数里的this参数

当你将一个函数传递到某个库函数里在稍后被调用时，你可能也见过回调函数里的 `this` 会报错。因为当回调函数被调用时，它会被当做一个普通函数调用，`this` 将为 `undefined`。稍作改动，就可以通过 `this` 参数来避免错误。首先，库函数的作者要指定 `this` 类型：

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

[详情](https://typescript.bootcss.com/functions.html)


## 重载

JavaScript 本身是个动态语音。JavaScript 里函数根据传入不同的参数返回不同类型的数据是很常见的。

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

`pickCard` 方法根据传入参数的不同会返回两种不同的类型。  如果传入的是代表纸牌的对象，函数作用是从中抓一张牌。 如果用户想抓牌，我们告诉他抓到了什么牌。 但是这怎么在类型系统里表示呢。

方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。 下面我们来重载 `pickCard` 函数。

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

```

这样改变后，重载的 `pickCard` 函数在调用的时候会进行正确的类型检查。

为了让编译器能够选择正确的检查类型，它与 JavaScript 里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，`function pickCard(x: any): any` 并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 `pickCard` 会产生错误。
