# Javascript 面向对象

## 面向对象基本特征

* 封装：也就是把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。
* 继承：通过继承创建出来的新类称为“子类”或“派生类”。继承的过程，就是从一般到特殊的过程。
* 多态：对象的多功能，多办法，一个办法多种表现形式。
* JavaScript 是一种基于对象（object-based）的语言。但是，他又不是一种真正的面向对象编程（OOP）语言，因为它的语法中没有 class（类）—— es6 以前是这样的。所以 es5 只有使用函数模拟的面向对象。


## 类的声明

```js
// ES5 
function Animal() {
  this.name = name;
}
// ES6
class Animal2 {
  constructor() {
    this.name = '张三';
  }
}
```

## 实例化

```js
const animal = new Animal();
const animal2 = new Animal2();
```

## 继承

### 借助构造函数实现继承

> 原型链并未继承

```js
function Parent() {
  this.name = 'parent';
}
Parent.prototype.say = function() {
  console.log('say parent')
};

function Child() {
  // 在子类中执行父类，改变 this 指向 Child 的实例上
  Parent.call(this)
}
```

### 借助原型链实现继承

> 实例属性共用，一个 Child 的实例改变 arr，另一个 Child 的实例 arr 也改变，因为两个实例的 `__proto__` 指向相同

```js
function Parent() {
  this.name = 'parent';
  this.arr = [1, 2, 3];
}
Parent.prototype.say = function() {
  console.log('parent say')
};

function Child() {
  this.type = 'child';
}

// 改变Child2的原型对象，☹
Child.prototype = new Parent();
const child1 = new Child();
const child2 = new Child();
```

### 组合方式

> Parent执行了两次，这个是没有必要的

```js
function Parent() {
  this.name = 'parent';
  this.play = [1, 2, 3];
}
Parent.prototype.say = function() {
  console.log('parent say')
};

function Child() {
  Parent.call(this);
  this.type = 'child';
}
Child.prototype = new Parent();

const child1 = new Child();
const child2 = new Child();
```

### 组合继承的优化方式 ①

> child1 的构造函数，现在指向的 Parent，`child1.__proto__.constructor === Parent`

```js
function Parent() {
  this.name = 'parent';
  this.play = [1, 2, 3];
}
Parent.prototype.say = function() {
  console.log('parent say')
};

function Child() {
  Parent.call(this);
  this.type = 'child';
}

Child.prototype = Parent.prototype;

const child1 = new Child();
const child2 = new Child();
```

### 组合继承的优化方式 ②

```js
function Parent() {
  this.name = 'parent';
  this.play = [1, 2, 3];
}
Parent.prototype.say = function () {
  console.log('parent5 say')
};

function Child() {
  Parent.call(this);
  this.type = 'child';
}

/**
* Child.prototype = Object.create(Parent.prototype) 与 Child.prototype = Parent.prototype 的区别：
* Object.create() 是将指定的对象当做创建对象的原型对象
* Child.prototype 的原型对象是父类的原型对象
* @type {Parent}
*/
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child1 = new Child();
const child2 = new Child();
```
