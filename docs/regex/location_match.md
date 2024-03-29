# 位置匹配模式

什么是位置？
位置是相邻字符之间的位置。

## 如何位置匹配

在 ES5 中，共有6个锚字符：
* `^`
* `$`
* `\b`
* `\B`
* `(?=p)`
* `(?!p)`

## `^ 和 $`

`^` （脱字符）匹配开头，在多行匹配中匹配行开头

`$` （美元符号）匹配结尾

比如把字符串的开头和结尾用 "#" 替换：

```js
/**
* "#hello#"
*/
const result = 'hello'.replace(/^|$/g, '#');
```

多行匹配时：

```js
/**
* "#I
* love
* js#"
*/
const result = 'I\nlove\njs'.replace(/^|$/g, '#');
```


## `\b` 和 `\B`

`\b` 是单词边界，具体就是 `\w` 和 `\W` 之间的位置，也包括 `\w` 和 `^` 之间的位置，，也包括 `\w` 和 `$` 之间的位置。

比如一个文件名是 `"[JS]Lesson_01.mp4"` 中的 `\b`，如下：

```js
/**
* "[#JS#] #Lesson_01#.#mp4#"
*/
const result = '[JS] Lesson_01.mp4'.replace(/\b/g, '#');
```

`\B` 就是 `\b` 的反面意思，非单词边界。例如在字符串中所有位置中，扣掉\b，剩下的都是\B的。

具体说来就是 `\w` 与 `\w`、`\W` 与 `\W`、`^` 与 `\W`，`\W` 与 `$` 之间的位置。

比如上面的例子，把 `\B` 替换成 "#"：

```js
/**
* "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"
*/
const result = '[JS] Lesson_01.mp4'.replace(/\B/g, '#');
```

## `(?=p)` 和 `(?!p)`

`(?=p)`，其中 p 是一个子模式，即 p 前面的位置。

比如 `(?=l)` ，表示 'l' 字符前面的位置，例如：

```js
/**
* "he#l#lo"
*/
const result = 'hello'.replace(/(?=l)/g, '#');
```

而 `(?!p)` 就是 `(?=p)` 的反面意思，比如：

```js
/**
* "#h#ell#o#"
*/
const result = 'hello'.replace(/(?!l)/g, '#');
```

## 位置的特性

对于位置的理解，可以理解成空字符 ""。

比如 "hello" 字符等价于如下的形式：

```js
"hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "o" + "";
```

也等价于：

```js
"hello" == "" + "" + "hello"
```

也就是说，字符之间的位置，可以写出多个。
