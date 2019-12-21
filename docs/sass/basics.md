# Sass 基础

## 使用变量

```scss
$nav-color: #F90;

nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

// 编译后
nav {
  width: 100px;
  color: #F90;
}
```


在声明变量时，变量的值也可以引用其他变量值。当通过粒度区分，为不同的值取不同名字时，这相当有用。

```scss
// 变量名常用中划线链接
$border-color: #F90;
$border: 1px solid $border-color;
.selected {
  border: $border;
}

// 编译后
.selected {
  border: 1px solid #F90;
}
```

## 嵌套 CSS 规则

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}

// 编译后
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

 父选择器的标识符 `&`，代表父级选择器的名称。
 
 ```scss
 $color: blue;
 article a {
   color: $color;
   &:hover { color: red }
 }
 article a { color: blue }
 article a:hover { color: red }
 ```

在 sass 中，除了 CSS 选择器，属性也可以进行嵌套。

```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}

// 编译后
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

```scss
nav {
  border: 1px solid #ccc {
    left: 0px;
    right: 0px;
  }
}

// 编译后
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

## 导入 Sass 文件

css 有一个特别不常用的特性，即 `@import` 规则，它允许在一个 css 文件中导入其他 css 文件。然而，后果是只有执行到 `@import` 时，浏览器才会去下载其他 css 文件，这导致页面加载起来特别慢。

sass 也有一个 `@import` 规则，但不同的是，sass 的 `@import` 规则在生成 css 文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个 css 文件中，而无需发起额外的下载请求。

使用 sass 的 `@import` 规则并不需要指明被导入文件的全名。你可以省略 `.sass` 或 `.scss` 文件后缀


### 使用SASS部分文件

专门为 `@import` 命令而编写的 sass 文件，并不需要生成对应的独立 css 文件。这样的 sass 文件称为局部文件。对此，sass 有一个特殊的约定来命名这些文件。

sass 约定，局部文件的文件名以下划线开头。当 `@import` 一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。

想导入 `themes/_night-sky.scss` 这个局部文件里的变量，只需在样式表中写 `@import "themes/night-sky";`。

### 默认变量值

一般情况下，反复声明一个变量，只有最后一处声明有效且覆盖前边的值。

```scss
$link-color: blue;
$link-color: red;
a {
  color: $link-color;
}

// 编译为
a {
  color: red;
}
```

可以使用 `!default` 标签声明一个变量的默认值，含义是：果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。

```scss
$fancybox-width: 400px !default;
.fancybox {
  width: $fancybox-width;
}

// 编译为
.fancybox {
  width: 400px;
}
```

### 嵌套导入

跟原生的 css 不同，sass 允许 `@import` 命令写在 css 规则内。这种导入方式下，生成对应的 css 文件时，局部文件会被直接插入到 css 规则内导入它的地方。

```scss
// _blue-theme.scss 局部文件
aside {
  background: blue;
  color: white;
}
```

将它导入到一个CSS规则内

```scss
.blue-theme {@import "blue-theme"}

// 编译为
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```

## 注释

```scss

/**
 * 多行注释
 * 多行注释
**/
 
 
// 单行注释
```

## 混合器

混合器使用 `@mixin` 标识符定义。

```scss
@mixin font {
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
```

然后就可以通过 `@include` 来使用这个混合器，`@include` 调用会把混合器中的所有样式提取出来放在 `@include` 被调用的地方。

```scss
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include font;
}

// 最终生成
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
```

### 混合器中的CSS规则

混合器中不仅可以包含属性，也可以包含 css 规则，包含选择器和选择器中的属性，如下代码：

```scss
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0;
  }
}

ul.plain {
  color: #444;
  @include no-bullets;
}

// 最终生成
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0x;
}
```

混合器中的规则甚至可以使用 sass 的父选择器标识符 `&`。

### 混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

a {
   @include link-colors(blue, red, green);
}

// 或者通过语法 $name: value 的形式指定每个参数的值

a {
  @include link-colors(
    $normal: blue,
    $visited: green,
    $hover: red
  );
}

// 最终生成
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

### 默认参数值

为了在 `@include` 混合器时不必传入所有的参数。可以给参数指定一个默认值。参数默认值使用 `$name: default-value` 的声明形式，默认值可以是任何有效的css属性值，甚至是其他参数的引用。

```scss
$hover-color: blue;
@mixin link-colors(
  $normal,
  $hover: $hover-color,
  $visited: $normal
) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

a {
 @include link-colors(red)
}

// 最终生成
a { color: red; }
a:hover { color: blue; }
a:visited { color: red; }
```

## 使用选择器继承来精简 CSS

使用 sass 的时候，最后一个减少重复的主要特性就是选择器继承。

选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式。这个通过 `@extend` 语法实现，如下代码:

```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

在上边的代码中，`.seriousError` 将会继承样式表中任何位置处为 `.error` 定义的所有样式。

class 为 `class="seriousError"` 的 html 元素 等同于 `class="seriousError error"`

继承不仅会继承 `.error` 自身的所有样式，任何跟 `.error` 有关的组合选择器样式也会被 `.seriousError` 以组合选择器的形式继承，如下代码:

```scss
//.seriousError从.error继承样式
.error a{  //应用到.seriousError a
  color: red;
  font-weight: 100;
}
h1.error { //应用到hl.seriousError
  font-size: 1.2rem;
}
```

如上所示，在 `class="seriousError"` 的 html 元素内的超链接也会变成红色和粗体。

### 何时使用继承

**混合器**主要用于展示性样式的重用，而类名用于语义化样式的重用。因为继承是基于类的（有时是基于其他类型的选择器），所以继承应该是建立在**语义化**的关系上。


