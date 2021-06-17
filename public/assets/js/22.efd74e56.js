(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{241:function(t,s,a){t.exports=a.p+"assets/img/proto.742ba610.png"},328:function(t,s,a){"use strict";a.r(s);var n=a(0),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"原型链"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#原型链","aria-hidden":"true"}},[t._v("#")]),t._v(" 原型链")]),t._v(" "),n("p",[n("img",{attrs:{src:a(241),alt:"原型链"}})]),t._v(" "),n("h2",{attrs:{id:"什么是原型链"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#什么是原型链","aria-hidden":"true"}},[t._v("#")]),t._v(" 什么是原型链")]),t._v(" "),n("p",[t._v("每个对象都可以有一个原型 "),n("code",[t._v("__proto")]),t._v("，这个原型还可以有它自己的原型，以此类推，形成一个原型链。查找特定属性的时候，我们先去这个对象里去找，如果没有的话就去它的原型对象里找，如果还没有的话再去原型对象的原型对象里找..... 这个操作被委托在整个原型链上，这个就是我们说的原型链了。")]),t._v(" "),n("h2",{attrs:{id:"原型指针"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#原型指针","aria-hidden":"true"}},[t._v("#")]),t._v(" 原型指针")]),t._v(" "),n("p",[t._v("接下来，我们就照着上面的图来具体分析一下原型的指针：中间最上面蓝色模块标准的构造函数 Foo，里面有两属性，"),n("code",[t._v("__proto__")]),t._v(" 和 "),n("code",[t._v("prototype")]),t._v("，这两个很容易使人混淆。")]),t._v(" "),n("h3",{attrs:{id:"prototype"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#prototype","aria-hidden":"true"}},[t._v("#")]),t._v(" "),n("code",[t._v("prototype")])]),t._v(" "),n("p",[t._v("prototype 属性，它是"),n("strong",[t._v("函数所独有的")]),t._v("，它是从"),n("strong",[t._v("一个函数指向一个对象")]),t._v("。它的含义是函数的原型对象，也就是这个函数（其实所有函数都可以作为构造函数）所创建的实例原型对象；这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫原型对象）")]),t._v(" "),n("h3",{attrs:{id:"proto"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#proto","aria-hidden":"true"}},[t._v("#")]),t._v(" "),n("code",[t._v("__proto__")])]),t._v(" "),n("p",[n("code",[t._v("__proto__")]),t._v(" 是原型链查询中实际得到的，它总指向 prototype，换句话说就是指向构造函数的原型对象，它是"),n("strong",[t._v("对象独有的")]),t._v("。注意，为什么 Foo 构造也有这个属性呢，因为再 JS 的宇宙里万物皆对象，包括函数")]),t._v(" "),n("p",[t._v("根据上面的概括我们能知道 Foo 构造函数 "),n("code",[t._v("__proto")]),t._v(" 指向的是他的构造函数的原型对象，它的构造函数时 Function，也就是说 Foo 的 "),n("code",[t._v("__proto")]),t._v(" 指向 "),n("code",[t._v("Function.prototype")])]),t._v(" "),n("p",[t._v("我们再看到左边绿色的 a 和 b 函数的 "),n("code",[t._v("__proto__")]),t._v(" 指像的是 Foo.prototype，因为他们是通过 new Foo 实例化出来的，它们的构造函数就是 Foo(), 即 "),n("code",[t._v("a.__proto__ = Foo.prototype")])]),t._v(" "),n("p",[t._v("接着我们来看看最右边紫色的模块 "),n("code",[t._v("Function.prororype")]),t._v("，它的 "),n("code",[t._v("__proto__")]),t._v(" 指针指向的是 "),n("code",[t._v("Object.prototype")]),t._v("， "),n("code",[t._v("Object.__proto__")]),t._v(" 又为 "),n("code",[t._v("null")])]),t._v(" "),n("p",[t._v("于是我们就可以得出：在原型链中的指向是，"),n("code",[t._v("函数 → 构造行数 → Function.prototype → Object.protype → null")]),t._v(" ;")]),t._v(" "),n("h3",{attrs:{id:"constructor"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#constructor","aria-hidden":"true"}},[t._v("#")]),t._v(" "),n("code",[t._v("constructor")])]),t._v(" "),n("p",[t._v("我们看到途中最中间灰色模块有一个 constructor 属性，这个又是做什么用的呢？")]),t._v(" "),n("blockquote",[n("p",[t._v("每个函数都有一个原型对象，该原型对象有一个 constructor 属性，指向创建对象的函数本身。")])]),t._v(" "),n("p",[t._v("此外，我们还可以使用 constructor 属性，所有的实例对象都可以访问 constructor 属性，constructor 属性是创建实例对象的函数的引用。我们可以使用 constructor 属性验证实例的原型类型（与操作符 instanceof 非常类似）。")]),t._v(" "),n("h2",{attrs:{id:"创建对象的几种方式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#创建对象的几种方式","aria-hidden":"true"}},[t._v("#")]),t._v(" 创建对象的几种方式")]),t._v(" "),n("h3",{attrs:{id:"第一种方式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#第一种方式","aria-hidden":"true"}},[t._v("#")]),t._v(" 第一种方式")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" o1 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'张三'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 字面量")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" o2 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'张三'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h3",{attrs:{id:"第二种方式：构造函数创建"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#第二种方式：构造函数创建","aria-hidden":"true"}},[t._v("#")]),t._v(" 第二种方式：构造函数创建")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("M")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("say")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'say hi'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" o "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("M")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'张三'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h3",{attrs:{id:"第三种方式：object-create"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#第三种方式：object-create","aria-hidden":"true"}},[t._v("#")]),t._v(" 第三种方式：Object.create()")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" p "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'p'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" o4 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("p"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h3",{attrs:{id:"new-运算符的工作原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#new-运算符的工作原理","aria-hidden":"true"}},[t._v("#")]),t._v(" new 运算符的工作原理")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("new2")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("func")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第一步，新建一个继承func原型的对象")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" o "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("func"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第二步，将func的上下文转移到o对象")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" k "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("func")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("o"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" k "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'object'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" o"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);