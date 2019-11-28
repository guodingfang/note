# 括号的作用

## 分组和分支结构

### 分组

`/a+/` 匹配连续出现的 'a'，要匹配连续出现的 'ab' 时，需要使用 `/(ab)+/` 。

其中括号是提供分组功能，使量词 `+` 作用于 'ab' 这个整体，如下：

```js
const regex = /(ab)+/g;
const string = 'abab abbb ababab';
string.match(regex);
// => ["abab", "ab", "ababab"]
```

### 分支结构

而在多分支结构 `(p1|p2)` 中，此处括号的作用也是不言而喻的，提供了子表达式的所有可能。

比如，要匹配如下的字符串：
* I love JavaScript
* I love Regular Expression

可以使用正则：

```js
const regex = /^I love (JavaScript|Regular Expression)$/;
regex.test("I love JavaScript");
// => true
regex.test("I love Regular Expression");
// => true
```

## 引用分组

这是括号一个重要的作用，有了它，我们就可以进行数据提取，以及更强大的替换操作。

而要使用它带来的好处，必须配合使用实现环境的API。

以日期为例。假设格式是 yyyy-mm-dd 的，可以先写一个简单的正则：

```js
const regex = /\d{4}-\d{2}-\d{2}/;
```

然后修改成括号版的：

```js
const regex = /(\d{4})-(0[1-9]|1[0-2]])-(0[1-9]|[12][0-9]|3[01])/;
const string = '2017-06-12';
string.match(regex);
// =>  ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12", groups: undefined]
```

match 返回一个数组，第一个元素是整体匹配结果，然后是各个分组（括号）匹配的内容，然后是各个分组（括号）匹配的内容，然后是匹配下标，最后是输入的文本。（注意：如果正则是否有修饰符 `g`，match 返回的数组格式是不一样的）

另外也可以使用正则对象 exec 方法：

```js
const regex = /(\d{4})-(0[1-9]|1[0-2]])-(0[1-9]|[12][0-9]|3[01])/;
const string = '2017-06-12';
regex.exec(string);
// =>  ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12", groups: undefined]
```

同时，也可以使用构造函数的全局属性 `$1` 至 `$9` 来获取：

```js
const regex =  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const string = '2017-06-12';

regex.test(string); // 正则操作即可，例如
//regex.exec(string);
//string.match(regex);

RegExp.$1;    // '2017'
RegExp.$2;    // '06'
RegExp.$3;    // '12'
```

替换

比如，想把 `yyyy-mm-dd` 格式，替换成 `mm/dd/yyyy` 该怎么做？

````js
const regex =  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const string = '2017-06-12';
string.replace(regex, "$2/$3/$1");
// => "06/12/2017"
````

其中 replace 中的，第二个参数里用 `$1`，`$2`，`$3` 指定相应的分组。等价于如下的形式：

```js
const regex =  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const string = '2017-06-12';
string.replace(regex, function() {
    return RegExp.$2 + '/' + RegExp.$3 + '/' + RegExp.$1;
});
// => "06/12/2017"
```

## 反向引用

除了使用相应的 API 引用分组，也可以在正则本身引用分组。但只能引用之前出现的分组，即反向分组。

以日期为例：

```js
const regex= /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
const string1 = '2017-06-12';
const string2 = '2017/06/12';
const string3 = '2017.06.12';
const string4 = '2016-06/12';
regex.test(string1);    // true
regex.test(string2);    // true
regex.test(string3);    // true
regex.test(string4);    // true
```

虽然达到了匹配要求，但也匹配 "2016-06/12" 怎样的数据。

假设想要求分割线前后一致怎么办？此时需要使用反向引用：

```js
const regex= /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
const string1 = '2017-06-12';
const string2 = '2017/06/12';
const string3 = '2017.06.12';
const string4 = '2016-06/12';
regex.test(string1);    // true
regex.test(string2);    // true
regex.test(string3);    // true
regex.test(string4);    // false
```

注意里面的 `\1`，表示的引用之前的那个分组 `(-|\/|\.)` 。不管它匹配到什么（比如-），`\1` 都匹配那个相同的具体的字符。

知道了 `\1` 的含义后，那么 `\2` 和 `\3` 的概念也就理解了，即分别指代第二个和第三个分组。

引用不存在分组会怎样？

在正则里引用不存在的分组时，此时正则不会报错，只是匹配引用的字符本身。例如\2，就匹配"\2"

## 非捕获分组

之前出现的分组，都会捕获它们匹配到的数据，以便后续引用，因此也称它们是捕获型分组。

如果只想要括号的原始的功能，但不会引用它，即，既不在 API 里引用，也不在正则里反向引用。此时可以使用非补货分组 `(?:p)`


```js

const regex = /(?:ab)/g;
const string = "ababa abbb ababab";
string.match(regex);
// => ["ab", "ab", "ab", "ab", "ab", "ab"]
```

