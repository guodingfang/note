# 基本语法

RegExp对象表示正则表达式，它是对字符串执行模式匹配的强大工具。

## 直接语法：

`/pattern/attributes`

## 创建 RegExp 对象的语法：

`new RegExp(pattern, attributes)`

## 参数

* 参数`pattern`是一个字符串，指定了正则表达式的模式或者其他正则表达式。
* 参数`attribute`是一个可选的字符串，包含属性'g'、'i'和'm'，区分大小写的匹配和多行匹配。

## 抛出

SyntaxError - 如果`pattern`不是合法的正则表达式，或 attributes 含有'g'、'i'和'm'之外的字符，抛出该异常。

## RegExp对象方法

| 方法 | 描述 | 语法 |
| --- | --- | --- |
| `complie` | 编译正则表达式 | -- |
| `exec` | 检索字符串指定的值。返回找到的值，并确定其位置 | `regex.exec(string)` |
| `test` | 检索字符串指定的值。返回`true`或`false` | `regex.test(string)` |

## 支持正则表达式String的方法

| 方法 | 描述 | 语法 |
| --- | --- | --- |
| `search` | 检索与正则表达式相匹配的值。返回其位置，未匹配则返回-1 | `string.search(regex)` |
| `match` | 找到一个或多个正则表达式的匹配。返回所有匹配的信息。 | `string.match(regex)` |
| `replace` | 替换正则表达式匹配的字符串。返回新的字符串。 | `string.replace(regex, func)` | 

