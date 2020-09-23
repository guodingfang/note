# Class

## ES6中类的写法

在ES6之前面向对象编程中，如果定义一个构造函数，一般来说是这样：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  return 'My name is ' + this.name + ', I am ' + this.age + ' years old';
}
```

ES6引入Class类这个概念，提供了更接近传统语言的写法，上诉代码用ES6实现就是：

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    return 'My name is ' + this.name + ', I am ' + this.age + ' years old'; 
  }
}
```

## constructor构造函数

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。

一个类必须有constructor方法，如果没有显示定义，会被默认添加一个空的constructor方法：

```js
class Person {}
// 等同于
class Person {
  constructor() {}
}
```

constructor方法默认返回实例对象（即this），完全可以指定返回另一个对象，但实际开发中不建议这样做：

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo;   // false
```

使用new运算符用于生成类的实例对象，如果忘记加上new，像函数那样调用class，将会报错：

```js
class Person {
  // ...
}
const person1 = new Person();     // 正确
const person2 = Person();         // 报错
```

## 属性

实例的属性除非显示定义在其自身（即定义在this对象上），否则都定义在原型上（即定义在class上），并且，类的所有实例共享一个原型对象。

```js
class Person {
  // 自身属性
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // 原型对象的属性
  say() {
    return 'My name is ' + this.name + ', I am ' + this.age + ' years old'; 
  }
}
const person = new Person('Jack', 23);
person.hasOwnProperty('name');    // true
person.hasOwnProperty('age');     // true
person.hasOwnProperty('say');     // false
person.__proto__.hasOwnProperty('say');   // true
```

上述代码中，name和age实例对象person自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而say是原型对象的属性（因为定义在Person类上），所以hasOwnProperty方法返回false。

## 表达式形式

与函数一样，可以使用表达式的形式定义一个类，即：

```js
const MyClass = class Me {
  getClassName() {
    return Me.name
  }
}
```

值得注意的是，这个类的名字是MyClass而不是Me，Me只在Class的内部代码可以用，用来指代当前类。

采用 Class 表达式，可以写出立即执行的 Class：

```js
let Person = new class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    return 'My name is ' + this.name + ', I am ' + this.age + ' years old';
  }
}('Jack', 23);
Person.say();     // "My name is Jack, I am 23 years old"
```

ES6中类不存在变量提升，不会把类的声明提升到代码的头部，即如果类使用在前，定义在后，这样就会报错：

```js
new Person();     // Uncaught ReferenceError : Person is not defined
class Person {}
```

:::tip
跟ES5一样，ES6的类定义中，也不支持私有属性和私有方法，只能通过变通的方法模拟（命名上加下划线等）
:::

## 静态方法

可以在一个类的方法前，加上static关键字，声明其为“静态方法”，这样就表示该方法不会被实例继承，而是通过直接调用类来调用：

```js
class Foo {
  static classMethod() {
    return 'Hello World';
  }
}
Foo.classMethod();    // 'Hello World'
const foo = new Foo();
foo.classMethod();    // TypeError: foo.classMethod is not a function
```

父类的静态方法可以被子类继承，也可以从super对象上调用：

```js
class Parent {
  static classMethod() {
    return 'Hello World';
  }
}

// 子类继承
class Child extends Parent {}
Child.classMethod();      // 'Hello World'

// 在super对象上调用
class Child extends Parent {
    static classMethod() {
        return super.classMethod();
    }
}
Child.classMethod();    // 'Hello World'
```

## 静态属性

静态属性值的是Class本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性，并且目前只有一下方法定义：

```js
class Foo {}
Foo.prop = 1;
Foo.prop;   // 1
```

## 类继承

Class可以通过extends关键字实现继承，这比ES5的通过修改原型链实现集成，要清晰和方便很多：

```js
class Parent {}
// 子类继承
class Child extends Parent {}
```

上面的代码定义了一个Child类，该类通过extends关键字，继承了Parent的所有属性和方法。

子类必须在constructor方法中调用super方法，否则新建实例时会报错。

这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象：

```js
class Parent {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// 子类继承
class Child extends Parent {
  constructor(name, age, hobby) {
    super(name, age);
    this.hobby = hobby;
  }
  say() {
    return 'My name is ' + this.name + ', I am ' + this.age + ' years old , I like ' + this.hobby;
  }
}
```

## super 关键字

super关键字，既可以当做函数使用，也可以当做对象使用：

作为函数调用时，代表父类的构造函数，并且只能在子类的构造函数之中，在其他地方就会报错：

```js
class A {}
class B extends A {
  m() {
    super();    // Uncaught SyntaxError: 'super' keyword unexpected here
  }
}
```

作为对象，在普通方法，指向父类的原型对象；在静态方法在，指向父类：

```js
class A {
  p() {
    return 2;
  }
}
class B extends A {
  constructor() {
    super();
    console.log(super.p());    // 2
  }
}
const b = new B();
```

需要注意的是，super指向的是父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的：

```js
class A {
  constructor() {
    this.p = 2;
  }
}
class B extends A {
  get m() {
    return super.p;
  }
}
const b = new B();
b.m;    // undefined
```

ES6规定，通过super调用父元素的方式时，super会绑定子类的this：

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  get m() {
    super.print();
  }
}
const b = new B();
b.m();    // 2
```
上面代码中，`super.print()`虽然调用的是`A.prototype.print()`，但是`A.prototype.print()`会绑定子类的B的this，导致输出的是2，而不是1。也就是说，实际上执行的是`super.print.call(this)`。

由于绑定子类的this，因此如果通过super对某个属性赋值，这时super就是this，赋值的属性就会变成子类实例的属性：

```js
class A {
  constructor() {
    this.x = 1;
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
  }
  print() {
    console.log(super.x);       // undefined
    console.log(this.x);        // 3
  }
}
const b = new B();
b.print();
```

上面代码中，`super.x`赋值为3，这时等同于`this.x`赋值为3。而当读取`super.x`的时候，读的是`A.prototype.x`，而A的原型上没有x属性，所以返回undefined。

如果super作为对象，用在静态方法之中，这是super将指向父类，而不是父类的原型对象。

```js
class Parent {
  static myMethod(msg) {
    console.log('static');
  }
  myMethod(msg) {
    console.log('instance');
  }
}
class Child extends Parent {
  static myMethod() {
    super.myMethod();
  }
    
  myMethod(msg) {
    super.myMethod();
  }
}
Child.myMethod();        // 指向父类，static
const child = new Child();
child.myMethod();        // 指向原型对象 instance
```

上述代码表明super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

---

Class作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链：

子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

子类的`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```js
class A {}
class B extends A {}
B.__proto__ === A;    // true
B.prototype.__proto__ === A.prototype;    // true
```
