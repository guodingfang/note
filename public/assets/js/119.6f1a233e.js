(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{365:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"字符匹配模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字符匹配模式","aria-hidden":"true"}},[t._v("#")]),t._v(" 字符匹配模式")]),t._v(" "),a("h2",{attrs:{id:"两种模糊匹配模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#两种模糊匹配模式","aria-hidden":"true"}},[t._v("#")]),t._v(" 两种模糊匹配模式")]),t._v(" "),a("p",[t._v('如果正则表达式只能精确匹配是没有多大意义的，比如/hello/，也只能匹配字符串中的"hello"这个字符串')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/hello/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),a("p",[t._v("正则表达式之所以强大，是因为其能实现模糊匹配。")]),t._v(" "),a("p",[t._v("模糊匹配，有两个方向上的'模糊'：横向模糊和纵向模糊。")]),t._v(" "),a("h3",{attrs:{id:"横向模糊匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#横向模糊匹配","aria-hidden":"true"}},[t._v("#")]),t._v(" 横向模糊匹配")]),t._v(" "),a("p",[t._v("横向模糊指的是，一个正则可匹配的字符串的长度不是固定的，可以是多种情况。")]),t._v(" "),a("p",[t._v("其实现的方式是使用量词，如："),a("code",[t._v("{m,n}")]),t._v("，表示连续出现最少 m 次，最多 n 次。")]),t._v(" "),a("p",[t._v("比如："),a("code",[t._v("/ab{2,5}c/")]),t._v(' 表示匹配这样一个字符串：第一个字符是 "a"，接下来是2到5个 "b"，最后是字符 "c"：')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/ab{2,5}c/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc abbc abbbc abbbbc abbbbbc abbbbbbc'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// ["abbc", "abbbc", "abbbbc", "abbbbbc"]')]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("注意：案例中用的正则表达式时 "),a("code",[t._v("/ab{2,5}c/g")]),t._v("，后面多个 "),a("code",[t._v("g")]),t._v("，它是正则表达式的一个修饰符。表示全局匹配，即在目标字符串中按顺序找到满足匹配模式的所有子串。")])]),t._v(" "),a("h3",{attrs:{id:"纵向模糊匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#纵向模糊匹配","aria-hidden":"true"}},[t._v("#")]),t._v(" 纵向模糊匹配")]),t._v(" "),a("p",[t._v("纵向模糊指的是，一个正则匹配的字符串，具体到某一个字符时，它可以不是某个确定的字符，可以有多种可能。")]),t._v(" "),a("p",[t._v("其实现方式是使用字符组。如 "),a("code",[t._v("[abc]")]),t._v('，表示字符是可以字符 "a","b","c" 中的任意一个。')]),t._v(" "),a("p",[t._v("比如："),a("code",[t._v("/a[123]b/")]),t._v(" 可以匹配如下的三种字符串：'a1b'，'a2b'，'a3b'：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/1[123]b/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a0b a1b a2b a3b a4b a5b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  ["a1b", "a2b", "a3b"]')]),t._v("\n")])])]),a("h2",{attrs:{id:"字符组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字符组","aria-hidden":"true"}},[t._v("#")]),t._v(" 字符组")]),t._v(" "),a("p",[t._v("需要强调的是，虽叫字符组（字符类），但只是其中一个字符。例如 "),a("code",[t._v("[abc]")]),t._v("，表示一个字符，可以是 a，b，c 之一。")]),t._v(" "),a("h3",{attrs:{id:"范围表示法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#范围表示法","aria-hidden":"true"}},[t._v("#")]),t._v(" 范围表示法")]),t._v(" "),a("p",[t._v("如果字符组的字符特别多，可以使用范围表示法。比如 "),a("code",[t._v("[123456abcdefGHIJKLM]")]),t._v("，可写成 "),a("code",[t._v("[1-6a-fG-M]")]),t._v("。用连字符 - 来省略和简写。")]),t._v(" "),a("p",[t._v("因为连字符有特殊用途，那么要匹配 'a'，'-'，'z' 这三者中任意一个字符，该怎么做呢？")]),t._v(" "),a("p",[t._v("不能写成 "),a("code",[t._v("[a-z]")]),t._v("，因为其表示小写字符中的任意一个字符。")]),t._v(" "),a("p",[t._v("可以写成如下的方式："),a("code",[t._v("[-az]")]),t._v(" 或 "),a("code",[t._v("[az-]")]),t._v(" 或 "),a("code",[t._v("[a\\-z]")]),t._v("。即要么放在开头，要么放在结尾，要么转义。总之不会让引擎认为是范围表示法就可以了。")]),t._v(" "),a("h3",{attrs:{id:"排除字符组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#排除字符组","aria-hidden":"true"}},[t._v("#")]),t._v(" 排除字符组")]),t._v(" "),a("p",[t._v("纵向模糊匹配，还有一种情形就是，某位字符可以是任何东西，但就不能是 'a'，'b'，'c'。")]),t._v(" "),a("p",[t._v("此时就是排除字符组（反义字符组）的概念。例如 "),a("code",[t._v("[^abc]")]),t._v("，表示一个除 'a'，'b'，'c' 之外的任意一个字符。字符组的第一位放^（脱字符），表示求反的概念。")]),t._v(" "),a("h3",{attrs:{id:"常见的简写形式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见的简写形式","aria-hidden":"true"}},[t._v("#")]),t._v(" 常见的简写形式")]),t._v(" "),a("p",[t._v("有了字符组的概念后，一些常见的符号也就理解了。它们都是系统自带的简写形式。")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("\\d")]),t._v(" 就是 "),a("code",[t._v("[0-9]")]),t._v("：表示是一位数字。记忆方式：其英文是digit（数字）")]),t._v(" "),a("li",[a("code",[t._v("\\D")]),t._v(" 就是 "),a("code",[t._v("[^0-9]")]),t._v("：表示除数字外的任意字符")]),t._v(" "),a("li",[a("code",[t._v("\\w")]),t._v(" 就是 "),a("code",[t._v("[0-9a-zA-Z_]")]),t._v("：表示数字、大小写字母和下划线。w是word的简写，也称为单词字符")]),t._v(" "),a("li",[a("code",[t._v("\\W")]),t._v(" 就是 "),a("code",[t._v("[^0-9a-zA-Z_]")]),t._v("：表示非单词字符")]),t._v(" "),a("li",[a("code",[t._v("\\s")]),t._v(" 就是 "),a("code",[t._v("[ \\t\\v\\n\\r\\f]")]),t._v("：表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母")]),t._v(" "),a("li",[a("code",[t._v("\\S")]),t._v(" 就是 "),a("code",[t._v("[^ \\t\\v\\n\\r\\f]")]),t._v("：表示非空白符")]),t._v(" "),a("li",[a("code",[t._v(".")]),t._v(" 就是 "),a("code",[t._v("[^\\n\\r\\u2028\\u2029]")]),t._v("：通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外")])]),t._v(" "),a("blockquote",[a("p",[t._v("想要匹配任意字符：可用 "),a("code",[t._v("[\\d\\D]")]),t._v("、"),a("code",[t._v("[\\w\\W]")]),t._v("、"),a("code",[t._v("[\\s\\S]")]),t._v("和 "),a("code",[t._v("[^]")]),t._v(" 中任何一个")])]),t._v(" "),a("h2",{attrs:{id:"量词"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#量词","aria-hidden":"true"}},[t._v("#")]),t._v(" 量词")]),t._v(" "),a("p",[t._v("量词也称重复。掌握 "),a("code",[t._v("{n,m}")]),t._v(" 的准确含义后，只需要记住一些简写形式。")]),t._v(" "),a("p",[t._v("简写形式：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("{m,}")]),t._v("：表示至少出现m次。")]),t._v(" "),a("li",[a("code",[t._v("{m}")]),t._v("：等价于{m,m}，表示出现m次")]),t._v(" "),a("li",[a("code",[t._v("?")]),t._v("：等价于{0,1}，表示出现或者不出现")]),t._v(" "),a("li",[a("code",[t._v("+")]),t._v("：等价于{1,}，表示至少出现1次")]),t._v(" "),a("li",[a("code",[t._v("*")]),t._v("：等价于{0,}，表示出现任意次，有可能不出现")])]),t._v(" "),a("h3",{attrs:{id:"贪婪匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#贪婪匹配","aria-hidden":"true"}},[t._v("#")]),t._v(" 贪婪匹配")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/\\d{2,5}/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123 1234 12345 123456'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// ["123", "1234", "12345", "12345"]')]),t._v("\n")])])]),a("p",[t._v("其中正则 "),a("code",[t._v("/\\d{2,5}/")]),t._v("，表示数字连续出现2到5次。会匹配2位、3位、4位、5位的连续数字。")]),t._v(" "),a("p",[t._v("但是其是贪婪的，它会尽可能多的匹配。你能给我6个，我就要5个。你能给我3个，我就3要个。反正只要在能力范围内，越多越好。")]),t._v(" "),a("h3",{attrs:{id:"惰性匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#惰性匹配","aria-hidden":"true"}},[t._v("#")]),t._v(" 惰性匹配")]),t._v(" "),a("p",[t._v("惰性匹配，就是尽可能少的匹配")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/\\d{2,5}?/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123 1234 12345 123456'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// ["12", "12", "34", "12", "34", "12", "34", "56"]')]),t._v("\n")])])]),a("p",[t._v("其中/\\d{2,5}?/表示，虽然2到5次都行。当2个就够的时候，就不会往下尝试了")]),t._v(" "),a("p",[t._v("通过在量词后面加个问号就能实现惰性匹配，因此所有惰性匹配情形如下：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("{m,n}?")])]),t._v(" "),a("li",[a("code",[t._v("{m,}?")])]),t._v(" "),a("li",[a("code",[t._v("??")])]),t._v(" "),a("li",[a("code",[t._v("+?")])]),t._v(" "),a("li",[a("code",[t._v("*?")])])]),t._v(" "),a("h2",{attrs:{id:"多选分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多选分支","aria-hidden":"true"}},[t._v("#")]),t._v(" 多选分支")]),t._v(" "),a("p",[t._v("一个模式可以实现横向和纵向模糊匹配。而多选分支可以支持多个子模式任选其一")]),t._v(" "),a("p",[t._v("具体形式如下："),a("code",[t._v("(p1|p2|p3)")]),t._v("，其中p1，p2，p3是子模式，用 "),a("code",[t._v("|")]),t._v("（管道符）分割，表示其中任何之一")]),t._v(" "),a("p",[t._v("例如要匹配 'good' 和 'nice' 可以使用 "),a("code",[t._v("/good|nice/")]),t._v("。测试如下：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/good|nice/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'good idea, nice try.'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// ["good", "nice"]')]),t._v("\n")])])]),a("p",[t._v("但有个事实应该注意，比如用 "),a("code",[t._v("/good|goodbye/")]),t._v('，去匹配 "goodbye" 字符串时，结果是 "good"：')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/good|goodbye/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'goodbye'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// ["good"]')]),t._v("\n")])])]),a("p",[t._v("而把正则改成 "),a("code",[t._v("/goodbye|good/")]),t._v("，结果是：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/goodbye|good/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'goodbye'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// ["goodbye"]')]),t._v("\n")])])]),a("p",[t._v("也就是说，分支结构也是惰性的，即当前面的匹配上了，后面就不再尝试了。")])])}),[],!1,null,null,null);s.default=e.exports}}]);