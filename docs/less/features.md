# Less 进阶

## 变量

在一个位置控制常用值。

### 基础用法

将样式表中重复出现的属性提取出来，写成变量，方便整体控制样式，与利于代码维护：

```less
// 变量
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);

// 使用
a,
.link {
  color: @link-color;
}
a:hover {
  color: @link-color-hover;
}
.widget {
  color: #fff;
  background: @link-color;
}
```

### 可变插值

上面的示例着重于使用变量来控制 CSS 规则中的值，但它们也可以在其他地方使用，例如选择器名称，属性名称， URL 和 `@import` 语句。

```less
// 变量
@my-selector: banner;
@property: color;
@images: "../img";
@themes: "../../src/themes";

// 使用
@import "@{themes}/tidal-wave.less";

.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

body {
  color: #444;
  background: url("@{images}/white-sand.png");
}

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

### 可变变量

在 Less 中，可以使用另一个变量定义变量的名称。

```less
@primary:  green;
@secondary: blue;

.section {
  @color: primary;

  .element {
    color: @@color;
  }
}

// 编译为：
.section .element {
  color: green;
}
```


### 懒惰评估

变量在使用之前不必声明。

```less
.lazy-eval {
  width: @var;
}

@var: @a;
@a: 9%;
```

两次定义变量时，使用变量的最后定义，从当前作用域向上搜索。

### 属性作为变量 <Badge text="v3.0.0"/>

您可以使用$prop语法轻松地将属性像变量一样对待

```less
.widget {
  color: #efefef;
  background-color: $color;
}

// 编译为：
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

### 默认变量

一种仅在尚未设置变量的情况下才可以设置的功能，可以通过在后面放置定义来轻松覆盖变量。

```less
// library
@base-color: green;
@dark-color: darken(@base-color, 10%);
```

```less
// use of library
@import "library.less";
@base-color: red;   // 覆盖 @base-color: green;
```


## 父选择器

### 引用父选择器 `&`

```less
a {
  color: blue;
  &:hover {
    color: green;
  }
}
.link {
  & + & {
    color: red;
  }
}
```
### 更改选择器顺序

可以通过 `&` 在当前选择器之后放置来完成

```less
.header {
  .menu {
    border-radius: 5px;
    .no-borderradius & {
      background-image: url('images/button-background.png');
    }
  }
}
// 输出：
.header .menu {
  border-radius: 5px;
}
.no-borderradius .header .menu {
  background-image: url('images/button-background.png');
}
```

### 组合

`&` 也可以用于生成逗号分隔列表中选择器的所有可能排列：

```less
p, a, ul, li {
  border-top: 2px dotted #366;
  & + & {
    border-top: 0;
  }
}
```

这将扩展为指定元素的所有可能（16）组合：

```less
p,
a,
ul,
li {
  border-top: 2px dotted #366;
}
p + p,
p + a,
p + ul,
p + li,
a + p,
a + a,
a + ul,
a + li,
ul + p,
ul + a,
ul + ul,
ul + li,
li + p,
li + a,
li + ul,
li + li {
  border-top: 0;
}
```

## 继承（Extend）

> Extend 可以理解成一种 Less 的伪类，形式为 `A:extend(B)`，其作用 `:` 使用这个伪类选择器 `(A)` 可以将符合其条件的选择器 `(B)` 的样式规则引用给自身用，即 `A` 会拥有 `B` 的样式规则。


```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}

// 编译为：
nav ul {
  background: blue;
}
.inline, 
nav ul {
  color: red;
}
```

### Extend 语法

Extend 要么接在选择器后面，要么放置在规则中。看起来很像是伪类选择器，并且拥有一个可选的参数 `all`

```less
.a:extend(.b){ ... }
//上面的代码与下面的代码编译出来的一致
.a{
    &:extend(.b);
}

.c:extend(.d all){
    //包含了".d"的所有实例，例如：" .x.d"或者".d.x"
}
.c:extend(.d){
    //只包含一个实例，选择器只会被编译成 ".d"的实例
}
```

Extend 中可以包含一个或者多个类，用逗号分隔：

```less
.e:extend(.f){...}
.e:extend(.g){...}
//上面和下面代码的编译结果一样
.e:extend(.f,.g){...}
```

### Extend 使用方式

Extend 的使用方式就像使用普通的伪类一样，一个选择器可以包含多个 Extend，但是所有 Extend 都要放置在这个选择器的末端。

* Extend 置于选择器后面： `pre:hover:extend(div pre)`
* 选择器和 Extend 之间允许间隔空格：`pre:hover :extend(div pre)`
* 允许多个 Extend：`pre:hover:extend(div pre):extend(.bucket tr) = pre:hover:extend(div pre, .bucket tr)`;
* 以下的用法是错误的：`pre:hover:extend(div pre).nth-child(odd)`， Extend 必须放在最末端

### 在规则中的 Extend

Extend 可以通过使用 `&:extend(selector)` 这个语法将 extend 放置在规则内部

```less
// 放在内部：
pre:hover,.some-class{
    &:extend(div pre);
    ...
}
// 等同于在每个选择器中单独添加 Extend：
pre:hover:extend(div pre),
.some-class:extend(div pre){...}
```

### Extend 中使用嵌套选择器

Extend 允许使用嵌套选择器（即 B 选择器为嵌套形选择器）：

```less
.bucket{
    tr{
        color: blue;
    }
}
.some-class:extend(.bucket tr){ ... }

// 编译为：
.bucket tr,
.some-class{
    color: blue;
}
```


关于 Extend 的更多详情[查看](https://www.jianshu.com/p/24bcd78878b1)


## 混合

### 合并属性

该 `merge` 功能允许将多个属性中的值聚合到单个属性下的逗号或空格分隔的列表中。`merge` 对于背景和变换等属性很有用。

#### `(+)` 用逗号附加属性值

```less
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;
}
// 产出
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

#### `(+_)` 用空格附加属性值

```less
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}
// 产出
.myclass {
  transform: scale(2) rotate(15deg);
}
```

为了避免任何无意的联接，在每个联接未决声明上都 merge 需要显式 `+` 或 `+_` 标记。

### 不输出混合

如果要创建一个 mixin，但又不希望该 mixin 出现在 CSS 输出中，请在 mixin 定义后加上括号。

```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin();
  .my-other-mixin();
}
// 输出
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

### Mixins 中的选择器

Mixins 不仅可以包含属性，还可以包含选择器。

```less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
// 输出
button:hover {
  border: 1px solid red;
}
```

### `!important` 关键字

`!important` 在 mixin 调用之后使用关键字将其继承的所有属性标记为 `!important`：

```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
// 输出
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

### 参数混合

Mixins 还可以接受参数，这些参数是在混合时传递到选择器块的变量。

```less
.border-radius(@radius: 5px) {
  border-radius: @radius;
}
#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```

#### `@arguments` 变量

`@arguments` 在 mixin 内部有特殊含义，它包含调用 mixin 时传递的所有参数。如果您不想处理单个参数，这将非常有用：

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
// 结果是：
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

#### 高级参数和 `@rest` 变量

`...` 希望mixin接受可变数量的参数

```less
.mixin(...) {}        // matches 0-N arguments
.mixin() {}           // matches exactly 0 arguments
.mixin(@a: 1) {}      // matches 0-1 arguments
.mixin(@a: 1; ...) {} // matches 0-N arguments
.mixin(@a; ...) {}    // matches 1-N arguments

.mixin(@a; @rest...) {
   // @rest is bound to arguments after @a
   // @arguments is bound to all arguments
}
```

### 模式匹配

想根据传递给它的参数来更改混合的行为

```less
.mixin(@s; @color) { ... }

.class {
  .mixin(@switch; #888);
}
```

要 `.mixin` 基于的值来表现不同 `@switch`，我们可以这样定义 `.mixin`：

```less
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}

@switch: light;
.class {
  .mixin(@switch; #888);
}

// 结果
.class {
  color: #a2a2a2;
  display: block;
}
```

* 第一个mixin定义不匹配，因为它应dark作为第一个参数。
* 第二个mixin定义匹配，因为它符合预期light。
* 第三个mixin定义匹配，因为它期望任何值。

### 使用 Mixins 作为函数

从混合调用中选择属性和变量

```less
.average(@x, @y) {
  @result: ((@x + @y) / 2);
}
div {
  padding: .average(16px, 50px)[@result];
}

// 结果
div {
  padding: 33px;
}
```

### 递归混合

此类递归 mixin 可用于创建各种迭代/循环结构。

```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}

// 输出
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

### 混合调用

可以将 Mixins 分配给变量以称为变量调用，也可以将其用于映射查找。

```less
#theme.dark.navbar {
  .colors(light) {
    primary: purple;
  }
  .colors(dark) {
    primary: black;
    secondary: grey;
  }
}

.navbar {
  @colors: #theme.dark.navbar.colors(dark);
  background: @colors[primary];
  border: 1px solid @colors[secondary];
}
// 结果
.navbar {
  background: black;
  border: 1px solid grey;
}
```

