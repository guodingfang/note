# Less 函数

Less 的所有内置函数

## 逻辑功能

### 如果（if）

根据条件返回两个值之一。

参数：
* `condition`：布尔表达式
* `value1`：如果 `condition` 为 `true`，则返回。
* `value2`：如果 `condition` 为 `false`，则返回。

```less
@some: foo;

div {
  margin: if((2 > 1), 0, 3px);
  color: if((iscolor(@some), @some, black));
  // iscolor() 判断是否是颜色
}

// 结果
div {
  margin: 0;
  color:  black;
}
```

注意：作为 `conditional` 参数支持的布尔表达式与 Guard Statements 相同

```
if(not (true), foo, bar);
if((true) and (2 > 1), foo, bar);
if((false) or (isstring("boo!")), foo, bar);
```

注意：在Less 3.6之前，该条件需要一组括号。

```
if(2 > 1, blue, green);   // Causes an error in 3.0-3.5.3
if((2 > 1), blue, green); // Ok 3.0+
```

### 布尔值（boolean）

判断为真或假

可以将一个布尔值存储在一个变量中，提供给 `if()`。

参数：
* `condition`：布尔表达式

```less
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);
// luma() 计算颜色对象的亮度

div {
  background: @bg; 
  color: if(@bg-light, black, white);
}

// 结果
div {
  background: black;
  color: white;
}
```

## 字符串函数

### 转义（escape）

将URL编码应用于在输入字符串中找到的特殊字符。
* 这些字符不编码：`,`，`/`，`?`，`@`，`&`，`+`，`'`，`~`，`!`和`$`。
* 最常见的编码的字符：`\<space\>`，`#`，`^`，`(`，`)`，`{`，`}`，`|`，`:`，`>`，`<`，`;`，`]`，`[`和`=`。

参数：
* `string`：一个要转义的字符串。

```
escape('a=1');

// 输出：
a%3D1
```

### 转义（e）

字符串转义。

它期望将字符串作为参数并按原样返回其内容，但不带引号。它可用于输出无效的CSS语法的CSS值，或使用Less不能识别的专有语法。

参数：
* `string`：要转义的字符串。
输出：
* `string`：转义的字符串，不带引号。

```
@mscode: "ms:alwaysHasItsOwnSyntax.For.Stuff()" 
filter: e(@mscode);

// 输出
filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
```

### 格式化（% format）

参数：
* `string`：带占位符的格式字符串
* `anything`*：用于替换占位符的值。
返回：
* formatted string。

```
format-a-d: %("repetitions: %a file: %d", 1 + 2, "directory/file.less");
format-a-d-upper: %('repetitions: %A file: %D', 1 + 2, "directory/file.less");
format-s: %("repetitions: %s file: %s", 1 + 2, "directory/file.less");
format-s-upper: %('repetitions: %S file: %S', 1 + 2, "directory/file.less");

// 输出：
format-a-d: "repetitions: 3 file: "directory/file.less"";
format-a-d-upper: "repetitions: 3 file: %22directory%2Ffile.less%22";
format-s: "repetitions: 3 file: directory/file.less";
format-s-upper: "repetitions: 3 file: directory%2Ffile.less";
```

### 替换（replace）

替换字符串中的文本

参数：
* `string`：要搜索和替换的字符串
* `pattern`：要搜索的字符串或正则表达式模式
* `replacement`：用于替换匹配模式的字符串。
* `flags`：（可选）正则表达式标志。

```
replace("Hello, Mars?", "Mars\?", "Earth!");
replace("One + one = 4", "one", "2", "gi");
replace('This is a string.', "(string)\.$", "new $1.");
replace(~"bar-1", '1', '2');

// 结果
"Hello, Earth!";
"2 + 2 = 4";
'This is a new string.';
bar-2;
```

## 清单功能

### 长度（length）

返回值列表中的元素数

参数：
* `list`：用逗号或空格分隔的值列表

例： `length(1px solid #0080ff);`
输出： `3`

```
@list: "banana", "tomato", "potato", "peach";
n: length(@list);

// 输出
n: 4;
```

### 提取（extract）

返回列表中指定位置的值

参数：
* `list`：用逗号或空格分割的值列表
* `index`：一个整数，指定要返回的列表元素的位置

例：`extract(8px dotted red, 2);`
输出：`dotted`

```
@list: apple, pear, coconut, orange;
value: extract(@list, 3);

// 输出
value: coconut;
```

### 范围（range）

生成一个列表

参数：
* `start`：（可选）起始值，例如1或1px
* `end`：最终值，例如5px
* `step`：（可选）要增加的金额

```
value: range(4)

// 输出
value: 1 2 3 4;

value: range(10px, 30px, 10);

// 输出
value: 10px 20px 30px;
```

### 循环（each）

将规则集的值绑定到每个列表的每个对象

参数：
* `list`：用逗号或空格分割的值列表
* `rules`：匿名规则集

```less
@selectors: blue, green, red;

each(@selectors, {
  .sel-@{value} {
    a: b;
  }
});

// 输出：
.sel-blue {
  a: b;
}
.sel-green {
  a: b;
}
.sel-red {
  a: b;
}
```

默认情况下，每一个规则集的约束，每个列表构件，一个 `@value`，`@key` 和 `@index` 可变的。对于大多数列表，`@key` 并且 `@index` 将被分配相同的值（数字位置，基于1），也可以将规则集本身用作结构化列表。

```less
@set: {
  one: blue;
  two: green;
  three: red;
}
.set {
  each(@set, {
    @{key}-@{index}: @value;
  });
}

// 输出
.set {
  one-1: blue;
  two-2: green;
  three-3: red;
}
```

在中设置变量名称 `each()`

```less
.set-2() {
  one: blue;
  two: green;
  three: red;
}
.set-2 {
  // 可以将一组属性、一个规则集合混入
  each(.set-2(), .(@v, @k, @i) {
    @{k}-@{i}: @v;
  });
}

// 输出
.set-2 {
  one-1: blue;
  two-2: green;
  three-3: red;
}
```

同时使用 `range` 和 `each`

```less
each(range(4), {
  .col-@{value} {
    height: (@value * 50px);
  }
});

// 输出：
.col-1 {
  height: 50px;
}
.col-2 {
  height: 100px;
}
.col-3 {
  height: 150px;
}
.col-4 {
  height: 200px;
}
```

## 数学函数


### 向上取整（ceil）

向上舍入到下一个最大整数

参数：
* `number`：浮点数

返回值：
* `integer`

```less
ceil(2.4);    // 输出 3
```

### 向下取整（floor）

向下舍入到下一个最小整数

参数：
* `number`：浮点数

返回值：
* `integer`

```less
floor(2.6);   // 输出 2
```

### 转换为百分比（percentage）

将浮点数转换为百分比字符串

参数：
* `number`：浮点数

返回值：
* `number`

```less
percentage(0.5)   // 输出 50%
```

### 舍入（round）

四舍五入获取

参数：
* `number`：浮点数
* `decimalPlaces`：可选：要舍入的小数位数。预设为0。

返回值：
* `number`

```less
round(1.67) // 输出 2

round(1.67, 1)  // 输出 1.7
```

### 平方根（sqrt）

计算数字的平方根。保持单位不变。

参数：
`number`：浮点数

返回值：
`number`

```less
sqrt(18.6%);  // 输出 4.312771730569565%;
```

### 绝对值（abs）

计算数字的绝对值。保持单位不变。

参数：
* `number`：浮点数

返回值：
* `number`

```less
abs(-18.6%);    // 输出 18.6%;
```

### 最小值（min）

返回一个或多个值的最小值

参数：
* `value1, ..., valueN`：一个或多个要比较的值

返回：
* `minValue`：最小值

```less
min(3px, 42px, 1px, 16px);  // 输出 1px
```

### 最大值（max）

返回一个或多个值的最大值

参数：
* `value1, ..., valueN`：一个或多个要比较的值

返回：
* `minValue`：最大值

```less
max(3px, 42px, 1px, 16px); // 输出 42px
```

## 类型功能

### 判断是否是数字（isnumber）

返回 `true` 是数字，`false` 不是数字

参数：
* `value`：要评估的值或变量

返回：
* `boolean`：返回 `true` 如果 `value` 是一个数字，返回 `false` 不是一个数字。

```less
isnumber(#ff0);     // false
isnumber(blue);     // false
isnumber("string"); // false
isnumber(1234);     // true
isnumber(56px);     // true
isnumber(7.8%);     // true
isnumber(keyword);  // false
isnumber(url(...)); // false
```

### 判断是否是字符串（isstring）

返回 `true` 是字符串，`false` 不是字符串

参数：
* `value`：要评估的值或变量

返回：
* `boolean`：返回 `true` 如果 `value` 是一个字符串，返回 `false` 不是一个字符串。

```less
isstring(#ff0);     // false
isstring(blue);     // false
isstring("string"); // true
isstring(1234);     // false
isstring(56px);     // false
isstring(7.8%);     // false
isstring(keyword);  // false
isstring(url(...)); // false
```

### 判断是否是颜色（iscolor）

返回 `true` 是颜色，`false` 不是颜色

参数：
* `value`：要评估的值或变量

返回：
* `boolean`：返回 `true` 如果 `value` 是一个字颜色，返回 `false` 不是一个字颜色。

```less
iscolor(#ff0);     // true
iscolor(blue);     // true
iscolor("string"); // false
iscolor(1234);     // false
iscolor(56px);     // false
iscolor(7.8%);     // false
iscolor(keyword);  // false
iscolor(url(...)); // false
```

### 其他判断方式类似

返回 `true` 是所规定的值，`false` 不是所规定的值

参数：
* `value`：要评估的值或变量

返回：
* `boolean`：返回 `true` 如果 `value` 是所规定的值，返回 `false` 不是所规定的值。

```less
// 判断 value 是否是 iskeyword
iskeyword(keyword);     // true

// 判断 value 是否是 url
isurl(url(...));        // true

// 判断 value 是否是 像素为单位的数字
ispixel(56px);          // true

// 判断 value 是否是 像素为百分比值
ispercentage(7.8%);     // true
```

### 判断是否是指定单位的数字（isunit）

返回 `true` 是指定单位的数字，`false` 不是指定单位的数字

参数：
* `value`：要评估的值或变量
* `unit`：要测试的单位标识符（可选加引号）

返回：
* `boolean`：返回 `true` 如果 `value` 是一个指定单位的数字，返回 `false` 不是一个指定单位的数字。

```less
isunit(11px, px);  // true
isunit(2.2%, px);  // false
isunit(33px, rem); // false
isunit(4rem, rem); // true
isunit(56px, "%"); // false
isunit(7.8%, '%'); // true
isunit(1234, em);  // false
isunit(#ff0, pt);  // false
isunit("mm", mm);  // false
```

### 判断是否是规则集（isruleset）

返回 `true` 是规则集，`false` 不是规则集

参数：
* `value`：要评估的值或变量

返回：
* `boolean`：返回 `true` 如果 `value` 是规则集，返回 `false` 不是规则集。

```less
@rules: {
    color: red;
}

isruleset(@rules);   // true
isruleset(#ff0);     // false
isruleset(blue);     // false
isruleset("string"); // false
isruleset(1234);     // false
isruleset(56px);     // false
isruleset(7.8%);     // false
isruleset(keyword);  // false
isruleset(url(...)); // false
```

## 杂项功能

### 颜色（color）

解析颜色，将代表颜色的字符串成为一种颜色。

参数：
* `strinf`：指定颜色的字符串

返回值：
* `color`

```less
color("#aaa");      // 输出 #aaa
```

### 图片尺寸（image-size）

从文件获取图像尺寸。

参数：
* `string`：要获取尺寸的文件。

返回值：
* `dimension`

```less
image-size("file.png");     // 输出 10px 10px

// 从文件获取图像宽度。
image-width("file.png");    // 输出 10px

// 从文件获取图像高度。
image-height("file.png");   // 输出 10px
```

### 兑换单位（convert）

将数字从一个单位转换为另一个单位。

第一个参数包含一个带单位的数字，第二个参数包含一个单位。如果设备兼容，则将转换数字。如果它们不兼容，则第一个参数将原样返回。

参数：
* `number`：带单位的浮点数。
* `identifier`，`string` 或 `escaped value`：单位

```less
convert(9s, "ms");     // 9000ms
convert(14cm, mm);     // 140mm
convert(8, mm);        // 8 incompatible unit types
```

### 图片（data-uri）

参数：
* `mimetype`：（可选）MIME 类型字符串。
* `url`：要内联的文件的 URL。

如果没有 `mimetype`，`data-uri()` 函数将从文件名后缀中猜测出来。文本和 svg 文件编码为 utf-8，其他所有文件编码为 base64。

```less
data-uri('../data/image.jpg');  
// 输出： url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');
data-uri('image/jpeg;base64', '../data/image.jpg');
// 输出： url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');
data-uri('image/svg+xml;charset=UTF-8', 'image.svg');
// 输出：url("data:image/svg+xml;charset=UTF-8,%3Csvg%3E%3Ccircle%20r%3D%229%22%2F%3E%3C%2Fsvg%3E");
```

### 默认匹配（default）

在警戒条件内可用，并且在没有其他混合匹配时返回

```less
.mixin(1)                   {x: 11}
.mixin(2)                   {y: 22}
.mixin(@x) when (default()) {z: @x}

div {
  .mixin(3);
}

div.special {
  .mixin(1);
}

// 输出
div {
  z: 3;
}
div.special {
  x: 11;
}
``` 

可以使用由default保护运算符返回的值。例如，`.mixin() when not(default()) {}` 仅当存在至少一个与 `.mixin()` call 匹配的 mixin 定义时才匹配：

```less
.mixin(@value) when (ispixel(@value)) {width: @value}
.mixin(@value) when not(default())    {padding: (@value / 5)}

div-1 {
  .mixin(100px);
}

div-2 {
  /* ... */
  .mixin(100%);
}

// 结果
div-1 {
  width: 100px;
  padding: 20px;
}
div-2 {
  /* ... */
}
```

高级多种 `default()` 用法：

```less
.x {
  .m(red)                                    {case-1: darkred}
  .m(blue)                                   {case-2: darkblue}
  .m(@x) when (iscolor(@x)) and (default())  {default-color: @x}
  .m('foo')                                  {case-1: I am 'foo'}
  .m('bar')                                  {case-2: I am 'bar'}
  .m(@x) when (isstring(@x)) and (default()) {default-string: and I am the default}

  &-blue  {.m(blue)}
  &-green {.m(green)}
  &-foo   {.m('foo')}
  &-baz   {.m('baz')}
}

// 结果：
.x-blue {
  case-2: #00008b;
}
.x-green {
  default-color: #008000;
}
.x-foo {
  case-1: I am 'foo';
}
.x-baz {
  default-string: and I am the default;
}
```

### 删除或更改尺寸单位（unit）

参数：
* `dimension`：数字，带或不带单位
* `unit`：（可选）要更改为的单位，如果省略，将删除该单位

```less
unit(5, px);    // 5px
unit(5em);      // 5
```

### 获取单位（get-unit）

参数：
* `number`：带或不带单位的数字。

```less
get-unit(5px);    // px
get-unit(5);      // nothing
```


