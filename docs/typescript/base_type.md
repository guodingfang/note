# 基础类型


## 布尔值

最基础的数据类型就是简单的 `true/false` 值，在 JavaScript 和 TypeScript 里叫做 `boolean`

```ts
let isDone: boolean = false;
```

## 数字

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。这些浮点数的类型是 `number`。支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015 中引入的二进制和八进制字面量

```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

## 字符串

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。像其他语言里一样，使用 `string` 表示文本数据类型。和 JavaScript 一样，可以使用双引号（"）和单引号（'）表示字符串

```ts
let name: string = 'boo';
name = 'smith';
```

还可以使用**模板字符串**，它可以定义多行文本和内嵌表达式。这种字符串是被包含在 （**`**），并且以 `${ expr }` 这种形式嵌入表达式

```ts
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }. I'll be ${ age + 1 } years old next month.`;
```

## 数组

TypeScript 像 JavaScript 一样可以操作数组元素。有两种方式可以定义数组。第一种，可以在元素类型后面直接接上 `[]`，表示有此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```ts
let list: Array<number> = [1, 2, 3]
```

## 元组 Tuple

元组类型允许表示一个元素已知数量和类型的数组，各元素的类型不必相同。比如，可以定义一对值分别为 `string` 和 `number` 类型的数组

```ts
let x: [string, number];
x = ['hello', 10];    // OK
x = [10, 'hello'];    // Error
```

## 枚举

`enum` 类型是对 JavaScript 标准数据类型的一个补充。像 C# 等其它语音一样，使用枚举类型可以为一组数值赋予友好的名字

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

## 任意值

有时候，想要为在编程阶段还不清楚类型的变量指定一个变量。这些值可能来自于动态的内容，比如来自用户输入或者第三方库。

这种情况下，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的阶段。可以使用 `ayn` 类型来标记这些变量：

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```

## 空值

某种程度上来说，`void` 类型像是与 `any` 类型相反，它表示没任何类型。当一个函数没有返回值时，通常会见到其返回值类型是 `void` ：

```ts
function warUser(): void {
  alert("This is my warning message");
}
```

声明一个 `void` 类型的变量没有什么大用，因为只能为它赋予 `undefined` 和 `null`：

```ts
let unusable: void = undefined;
```

## Null 和 Undefined

TypeScript 里，`undefined` 和 `null` 两者各自有各自自己的类型分别叫做 `undefined` 和 `null`。和 `void` 相似，它们的本身的类型用处不是很大：

```ts
let u: undefined = undefined;
let n: null = null;
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。就是说可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量

然而，当指定了 `--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自


## Never

`never` 类型表示的是那些永远不存在的类型。例如，`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回类型；变量也可能是 `never` 类型，当它们被永不为真的类型所约束时

`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never` 的子类型可以赋值给 `never` 类型（除了 `never` 本身之外）。即使 `any` 也不可以赋值给 `never`

下面是一些返回 `never` 类型的函数：

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something faild");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

## 类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一种为 `as` 语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

两种形式是等价的。至于使用那个大多数清下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 `as` 语法断言是被允许的。

## 关于 let

尽可能使用 `let` 代替 `var`
