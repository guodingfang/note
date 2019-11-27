# 基本语法

## 直接语法：

`/pattern/attributes`


## 创建 RegExp 对象的语法：

`new RegExp(pattern, attributes)`

## 参数

* 参数 pattern 是一个字符串，指定了正则表达式的模式或者其他正则表达式。
* 参数 attribute 是一个可选的字符串，包含属性 'g'、'i'和'm'，区分大小写的匹配和多行匹配。

## 抛出

* SyntaxError - 如果 pattern 不是合法的正则表达式，或 attributes 含有 'g'、'i'和'm' 之外的字符，抛出该异常。


## RegExp对象方法

| 方法 | 描述 |
| --- | --- |
| complie | 编译正则表达式 |
| exec | 检索字符串指定的值。返回找到值，并确定其位置 |
| test | 检索字符串中指定的值。返回 true 或 false |


## 支付正则表达式 String 的方法

| 方法 | 描述 | 说明 |
| --- | --- | --- |
| search | 检索与正则表达式相匹配的值 | |
| match | 找到一个或多个正则表达式的匹配 | 方法可以在字符串内检索指定的值，找到一个或多个正则表达的匹配，返回匹配结果的数组 |
| replace | 替换与正则表达式匹配的子串 | |
| split | 把字符串分割为字符串数组 | |
