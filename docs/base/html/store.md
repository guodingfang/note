# Web存储

## Cookie

Cookie是HTML4的一个标准，它一般不需要考虑兼容。它是网站的一个身份证，服务器可以针对不同的用户，做出不同的响应。cookie存储在用户的机器上是一个纯文本，就是一个txt文件并不是一个脚本，它不能执行东西只负责记录。浏览器每次请求都会带上当前网站的cookie。

Cookie分为两种类型

| 类型 | 说明 |
| --- | --- |
| 会话cookie | 临时性的cookie，退出浏览器或者关闭即删除 |
| 持久cookie | 会一直存在，存在的时间由特定的过期时间或者是有效期来决定 |



## SessionStorage方法

key-value的键值对，是HTML5新增的一个会话存储对象。

SessionStorage是临时保存在同一窗口，也就是同一标签页的数据。如果当前标签页关闭了，那么SessionStorage也就失效了。这也是SessionStorage最显著的一个特点：单页标签限制。

#### 特点
- 同源策略，也就是在同一协议，同一主机名和同一端口的同一tab
- 只在本地存储，不会跟随http请求发送到服务器
- 存储方式采用key-value键值对，这里面的value只能存字符串类型，如果存其他的会自动转换成字符串。
- 存储上限限制达到了5MB，如果当存储超出上限新的内容会把旧的内容覆盖但不会报错。

#### 属性

| 属性 | 说明 |
| --- | --- |
| `sessionStorage.length` | 键值对数量 |
| `sessionStorage.key(int index)` | 读取第index个数据的名字或称为键值（从0开始计数） |
| `sessionStorage[string key]` | 获取sessionStorage仓库中当前键名的值 |
| `sessionStorage.getItem(string key)` | 读取数据 |
| `sessionStorage.setItem(string key, string value)` | 存储数据 |
| `sessionStorage.removeItem(string key)` | 删除某个具体数据 |
| `sessionStorage.clear()` | 清空sessionStorage上存储的数据 |

#### Json对象
| 属性 | 说明 |
| --- | --- |
| `JSON.stringify()` | 使用`JSON.stringify()`方法将JavaScript对象转换为字符串 |
| `JSON.parse()` | 使用`JSON.parse()`方法将数据转换为JavaScript对象 |

## localStorage方法

LocalStorage和SessionStorage十分相似，同样是key-value键值对，也是HTML5新增存储对象，它与SessionStorage的特点不同之处在于没有标签页的限制和在浏览器无痕模式下LocalStorage是不允许读取的。

LocalStorage永久性的存储。SessionStorage超出限制是覆盖不会报错而LocalStorage超出会报错。

#### 特点
- 同源策略，也就是在同一协议，同一主机名和同一端口下的同一tab
- 没有标签页的限制
- 只在本地存储，不会跟随http请求发送到服务器
- 存储方式采用key-value键值对，这里面的value只能存字符串类型，如果存其他的会自动转换成字符串
- 存储上限达到了5MB，如果当前存储超出上限会报错
- 无痕模式下不可读
- 永久性存储

#### 属性
| 属性 | 说明 |
| --- | --- |
| `localStorage.length` | 键值对数量 |
| `localStorage.key(int index)` | 读取第index个数据的名字或称为键值（从0开始计数） |
| `localStorage[string key]` | 获取localStorage仓库中当前键名的值 |
| `localStorage.getItem(string key)` | 读取数据 |
| `localStorage.setItem(string key)` | 存储数据 |
| `localStorage.removeItem(string key)` | 删除某个具体数据 |
| `localStorage.clear()` | 清空localStorage上存储的数据 |

注意事项：LocalStorage和SessionStorage在web view是不可靠的，web view指的是在开发混合APP的时候使用了浏览器来实现我们的APP，这个时候是不可靠的，因为在浏览器崩溃的情况下数据可能没有存进去。

#### 监听storage的变化

监听storage包括SessionStorage和LocationStorage。然后这里提到两个概念：同源监听同源网页。

同源：协议、域名、端口三者相同，同源的情况下可以共享SessionStorage和LocationStorage。

同源策略还禁止不同源执行任何脚本

```
http://localhost:63342/simpleApp/app/index.html#/
(协议)  (域名)   (端口)         (路径)
```

## IndexedDB


