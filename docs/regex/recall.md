# 回溯法原理

假设正则是 `/ab{1,3}c/g`，当目标字符串是 'abbbc' 时，就没有所谓的“回溯”。

## 有匹配的回溯

如果目标字符串是 'abbc'，中间就有回溯。

`b{1,3}` 已经匹配了2个字符 'b'，准备尝试第三个时，结果发现接下来的字符是 'c'，那么就认为 `b{1,3}` 就已经匹配完毕。然后状态又回到之前的状态，最后再用子表示式 c，去匹配字符 'c'。


## 常见的回溯形式

正则表达式匹配字符串的这种方式，有个学名，叫回溯法。

回溯法也称试探法，它的基本思想是：从问题的某一种状态（初始状态）出发，搜索从这种出发所能达到的所有"状态"，当一条路走到"尽头"的时候（不能再前进），再后退一步或若干步，从另一种可能的"状态"出发，继续搜索，直到所有的"路径"（状态）都试探过。这种不断"前进"、不断"回溯"寻找解的方法，就称为"回溯法"。

## 贪婪量词

`b{1,3}`，因其是贪婪的，尝试可能的顺序从多往少的方向去尝试。首先会尝试'bbb'，然后再看整个正则是否能匹配。不能匹配时，吐出一个"b"，即在"bb"的基础上，再做尝试，如果还不行，再吐出一个，再试。如果还不行，只能说明匹配失败了。

如果当多个贪婪量词挨着存在，并相互冲突时，此时会是怎样？

答案是，先下手为强！因为深度优先搜索。测试如下：

```js
const string = '12345';
const regex = /(\d{1,3})(\d{1,3})/;
string.match(regex);
// => ["12345", "123", "45", index: 0, input: "12345", groups: undefined]
```

其中，前面的 `\d{1,3}` 匹配的是 "123"，后面的 `\d{1,3}` 匹配的是 "45"。

## 惰性量词

惰性量词就是在贪婪量词后面加个问号。表示尽可能少的匹配，比如：

```js
const string = '12345';
const regex = /(\d{1,3}?)(\d{1,3})/;
string.match(regex);
// => ["1234", "1", "234", index: 0, input: "12345", groups: undefined]
```

其中 `\d{1,3}?` 只能匹配到一个字符 '1'，而后面的 `\d{1,3}`匹配了 '234'。

虽然惰性量词不贪，但也会有回溯现象。比如正则是：`/^(\d{1,3}?)(\d{1,3})$/`

```js
const string = '12345';
const regex = /^(\d{1,3}?)(\d{1,3})$/;
string.match(regex);
// => ["12345", "12", "345", index: 0, input: "12345", groups: undefined]
```

## 分支结构

分支也是惰性的，比如 `/can|candy/`，去匹配字符串 "candy" 得到的结果是 "can"，因为分支会一个一个尝试，如果前面满足了，后面就不会再实验了。

分支结构，可能前面的子模式会形成局部匹配，如果接下来表达式整体不匹配时，仍会继续尝试接下来的分支。这种尝试也会看成一种回溯。

```js
const regex = /^(?:can|candy)$/;
const string = 'candy';
string.match(regex);
// => ["candy", index: 0, input: "candy", groups: undefined]
```
