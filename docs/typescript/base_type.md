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



