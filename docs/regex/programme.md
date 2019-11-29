# 表达式编程

## 正则表达式的四种操作

正则表达式时匹配模式，不管如何使用正则表达式，万变不离其宗，都需要先"匹配"。

有了匹配这一操作，才有其他操作：验证、切分、提取、替换。

## 验证

验证是正则表达式最直接的应用，比如表单验证。

在说验证之前，先要说清楚匹配是什么概念。

所谓匹配，就是看目标字符串里是否有满足匹配的子串。因此，**"匹配"的本质就是"查找"**。有没有匹配，是不是匹配上，判断是否的操作，即称为 **"验证"**。

比如，判断一个字符串中是否有数字：


```js
const regex = /\d/;
const string = 'abc123';
// 使用 search，返回第一个匹配的位置：
!!string.search(regex);
// => true

// 使用 test，判断是否匹配成功
regex.test(string);
// => true

// 使用 match，存放匹配结果的数组，没有匹配的话，返回 null
!string.match(regex);
// => true

// 使用 exec，存放匹配结果数组，没有匹配的话，返回 null
!!regex.exec(string);
// => true
```

## 切分

匹配上以后，就可以做一些操作，比如切分

所谓"切分"，就是把目标字符串，切成一段一段的，在 JS 中使用的是 split。

```js
const regex = /,/;
const string = 'html,css,javascript'
string.split(regex);
// => ["html", "css", "javascript"]
```

## 提取

虽然整体匹配上了，但有时候需要提取部分匹配的数据。

此时正则通常需要使用分组引用（分组捕获）功能，还需要配合使用相关API。

```js
const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
const string = '2017-06-26';

// 使用 match
string.match(regex);
// => ["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26", groups: undefined]

// 使用 exec
regex.exec(string);
// => ["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26", groups: undefined]

// 使用 test
regex.test(string);
RegExp.$1;
RegExp.$2;
RegExp.$3;
// => "2017" "06" "26"

// 使用 search
string.search(regex);
RegExp.$1;
RegExp.$2;
RegExp.$3;
// => "2017" "06" "26"

// 使用 replace
const date = [];
string.replace(regex, function(match, year, month, day) {
    date.push(year, month, day);
});
date;
// => ["2017", "06", "26"]
```

## 替换

找往往不是目的，通常下一步是为了替换。在 JS 中，使用 replace 进行替换。

```js
const string = "2017-06-26";
const today = new Date(string.replace(/-/g, '/'));
today;
// => Mon Jun 26 2017 00:00:00 GMT+0800 (中国标准时间)
```
