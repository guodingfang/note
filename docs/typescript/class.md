# 类（class）

## 介绍

传统的 JavaScript 程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。ECMAScript 2015，也就是 ECMAScript 6 开始，JavaScript 程序员将能够使用基于类的面向对象的方式。

使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。


## 类

下面看一个使用类的例子：

```ts
class Greeter {
  greeting: string,
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, {this.greeting}`
  }
}

let greeter = new Greeter("world");
```

声明了一个 `Greeter` 类。这个类有3个成员：一个叫做 `greeting` 的属性，一个构造函数和一个 `greet` 方法。

在引用任何一个类成员的时候都用了 `this`。它表示我们访问的是类的成员。

最后一行，我们使用 `new` 构造了 `Greeter` 类的一个实例。它会调用之前定义的构造函数，创建一个 `Greeter` 类型的新对象，并执行构造函数初始化它。

## 继承

在 TypeScript 里，我们可以使用常用的面向对象模式。基于类的程序设计中一种最基本的模式时允许使用继承来扩展现有的类。

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

这个例子展示了基本的继承：类从基类中继承了属性和方法。这里，`Dog` 是一个派生类，它派生自 `Animal` 基类，通过 `extends` 关键字。派生类通常被称为子类，基类通常被称作超类。

因为 `Dog` 继承了 `Animal` 的功能，因此我们可以创建一个 `Dog` 的实例，它能够 `bark()` 和 `move()`。

下面我们来看个更加复杂的例子。

```ts
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

这个例子展示了一些上面没有提到的特性。这一次，我们使用 `extends` 关键字创建了 `Animal` 的两个子类：`Horse` 和 `Snake` 。

与前一个例子的不同点是，派生类包含一个构造函数，它必须调用 `super()`，它会执行基类的构造函数。而且，在构造函数里访问 `this` 的属性之前，我们一定要调用 `super()`。这个是 TypeScript 强制执行的一条重要规则。

这个例子演示了如何在子类里可以重写父类的方法。`Snake` 类和 `Horse` 类都创建了 `move` 方法，它们重写了从 `Animal` 继承来的 `move`方法，使得move方法根据不同的类而具有不同的功能。注意，即使 tom 被声明为 Animal 类型，但因为它的值是 Horse，调用 tom.move(34) 时，它会调用 Horse 里重写的方法：

```
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```

## 公共，私有与受保护的修饰符

### 默认为 public

上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 `public` 来做修饰；例如，C# 要求必须明确地使用 `public` 指定成员是可见的。 在 TypeScript 里，成员都默认为 `public`。

也可以明确的将一个成员标记为 `public`。我们可以用下面的方法重写上面的 `Animal` 类：

```ts
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

### 理解 private

当成员被标记称 `private` 时，它不能在声明它的类的外部访问。比如：

```ts
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

TypeScript 用的是结构性类型系统。当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有 `private` 或 `protected` 成员的类型的时候，情况就不一同了。如果其中一个类型里包含一个 `private` 成员，并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 `protected` 成员也使用这个规则。

下面来看一个例子，更好地说明了这一点：

```ts
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
  constructor() { super("Rhino"); }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```

这个例子中有 `Animal` 和 `Rhino` 两个类，`Rhino` 是 `Animal` 类的子类，还有一个 `Employee` 类，其类型看上去与 `Animal` 是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。

因为 `Animal` 和 `Rhino` 共享了来自 `Animal` 里的私有成员定义 `private name: string`，因此它们是兼容的。

然而 `Employee` 却不是这样。当把 `Employee` 赋值给 `Animal` 的时候，得到一个错误，说它们的类型不兼容。 尽管 `Employee` 里也有一个私有成员 `name`，但它明显不是 `Animal` 里面定义的那个。

### 理解 protected

`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected` 成员在派生类中仍然可以访问。例如：

```ts
class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name)
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

注意，我们不能在 `Person` 类外使用 `name`，但是我们仍然可以通过 `Employee` 类的实例方法访问，因为 `Employee` 是由 `Person` 派生而来的。

构造函数也可以被标记成 `protected`。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如:

```ts
class Person {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```

