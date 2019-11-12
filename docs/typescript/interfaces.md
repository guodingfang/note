# 接口

## 介绍
TypeScript 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

## 接口初探

下面通过一个简单示例来观察接口是如何工作的：

```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

类型检查器会查看 `printLabel` 的调用，`printLabel` 有一个参数，并要求这个对象参数有有一个名为 `label` 类型为 `string` 的属性。需要注意点的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。

下面重写上面的例子，这里使用接口来描述：必须包含一个 `label` 属性且类型为 `string`：

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

`LabelledValue` 接口就好比一个名字，用来描述上面例子的要求。它代表了有一个 `label` 属性且类型为 `string` 的对象。需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel 的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

## 可选属性

接口里的属性不全都是必需的。有些只在某些条件下存在，或者根本不存在。可选属性在应用"option bags"模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

下面是应用了“option bags”的例子：

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

带有可选属性的接口和普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用不存在的属性时的错误。比如，我们故意将 createSquare 里的 color 属性名拼错，就会得到一个错误提示：

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。可以在属性名前用 `readonly` 来指定只读属性：

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

你可以通过赋值一个对象字面量来构造一个 Point。 赋值后，x 和 y 再也不能被改变了。

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

上面代码的最后一行，可以看到就算把整个 `ReadonlyArray` 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

```ts
a = ro as number[];
```


### readonly vs const

最简单判断改用 `readonly` 还是 `const` 的方法是看要把它作为变量使用还是作为一个属性。作为变量使用的话用 `const` ，若作为属性使用 `readonly`。

## 额外的属性检查

## 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

这样定义后，我们可以使用其他接口一样使用这个函数类型的接口。下例展示了如果创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```ts
let mySearch: SearchFunc;
mySearch = function(source: string, suString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

对于函数类型的类型检查来说，函数的参数名不需要与接口定义的名字相匹配。比如，我们使用下面的代码重写上面的例子重写上面的例子：

```ts
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

函数的参数会逐个进行检查，要求对应位置的参数类型是兼容的。如果不想指定类型，TypeScript 的类型系统会推断出参数的类型，因为函数直接赋值给了 `SearchFunc` 类型变量。函数的返回值类型系统会推断出参数类型，因为函数直接赋值给了 `SearchFunc` 类型变量。函数的返回值类型是通过其返回值推断出来的(此例是 `false` 和 `true`)。如果让这个函数返回字数字或字符串，类型检查器会警告我们函数的返回值类型与 `SearchFunc` 接口中定义不匹配。

```ts
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

## 可索引的类型

与使用接口描述函数类型差不多，我们也可以描述那些能过“通过索引得到”的类型，比如 `a[10]` 或者 `ageMap["daniel"]`。可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回类型。让我们看一个例子：

````ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
````

上面例子里，我们定义了 `StringArray` 接口，它具有索引签名。这个索引签名表示了当用 `number` 去索引 `StringArray` 时会得到 `string` 类型的返回值。

## 类类型

### 实现接口

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```ts
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
   currentTime: Date;
   constructor(h: number, m: number) { }
}
```

也可以在接口中描述一个方法，在类里实现它，如下面 `setTime` 方法一样：

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

### 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。你会注意到，当你用构造函数签名去定义接口并试图定义一个类去实现这个接口时会得到一个错误：

```ts
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。`constructor` 存在于类的静态部分，所以不在检查的范围内。

因此，我们应该直接操作类的静态部分。看下面的例子，我们定义了两个接口，`ClockConstructor` 为构造函数所用和 `ClockInterface` 为实例方法所用。 为了方便我们定义一个构造函数 `createClock`，它用传入的类型创建实例。

```ts
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

## 继承接口

和类一样，接口也可以互相继承。这让我们能够从一个接口复制成员到另一个接口里，可以更灵活的将接口分割到可重用的模块里。

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

## 混合类型

接口能够描述 JavaScript 里丰富的类型。因为 JavaScript 其动态灵活的特点，有时你先希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象同时作为函数和对象使用，并带有额外的属性。

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

在使用 JavaScript 第三方库的时候，你可能需要像上面那样去完整地定义类型。

## 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了所在类中存在的成员，但并没有提供具体的实现一样。接口同样会继承到类的 private 和 protected 成员。这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 例：

```ts
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {

}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    select() { }
}

class Location {

}
```

在上面的例子里，`SelectableControl` 包含了 `Control` 的所有成员，包括私有成员 `state`。因为 `state` 是私有成员，所以只能够是 `Control` 的子类们才能实现 `SelectableControl` 接口。 因为只有 `Control` 的子类才能够拥有一个声明于 `Control` 的私有成员 `state`，这对私有成员的兼容性是必需的。[详情](https://typescript.bootcss.com/interfaces.html)
