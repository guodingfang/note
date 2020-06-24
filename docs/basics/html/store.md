# Web存储

## Cookie

Cookie是HTML4的一个标准，它一般不需要考虑兼容。它是网站的一个身份证，服务器可以针对不同的用户，做出不同的响应。cookie存储在用户的机器上是一个纯文本，就是一个txt文件并不是一个脚本，它不能执行东西只负责记录。浏览器每次请求都会带上当前网站的cookie。

**Cookie分为两种类型**

| 类型 | 说明 |
| --- | --- |
| 会话cookie | 临时性的cookie，退出浏览器或者关闭即删除 |
| 持久cookie | 会一直存在，存在的时间由特定的过期时间或者是有效期来决定 |


### 什么是cookie

HTTP协议本身是无状态的。什么是无状态呢？即服务器无法判断用户的身份。如果服务器需要记录该用户状态，就使用response向客户端浏览器颁发一个Cookie。客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态。


### cookie机制

当用户第一次访问并登陆一个网站的时候，cookie的设置以及发送会经历以下4个步骤：
- 第一步：客户端发送一个请求到服务器；
- 第二步：服务器发送一个HttpResponse响应到客户端，其中包括Set-Cookie的头部；
- 第三步：客户端存储cookie，之后向服务器发送请求时，HttpRequest请求中会包含一个Cookie的头部；
- 第四步：服务器返回响应数据。


### cookie属性项

| 属性项 | 属性项介绍 |
| --- | ---|
| NAME=VALUE | 键值对，可以设置要保存的 Key/Value，注意这里的 NAME 不能和其他属性项的名字一样 |
| Expires | 过期时间，在设置的某个时间点后该 Cookie 就会失效 |
| Domain | 生成该 Cookie 的域名 |
| Path | 该 Cookie 是在当前的哪个路径下生成的，如 path=/wp-admin/ |
|Secure | 如果设置了这个属性，那么只会在 SSH 连接时才会回传该 Cookie |


## SessionStorage

SessionStorage是以key-value的键值对存储的，是HTML5新增的一个会话存储对象。

SessionStorage是临时保存在同一窗口，也就是同一标签页的数据。如果当前标签页关闭了，那么SessionStorage也就失效了。这也是SessionStorage最显著的一个特点：单页标签限制。


### SessionStorage特点

- 同源策略，也就是在同一协议，同一主机名和同一端口的同一tab
- 只在本地存储，不会跟随http请求发送到服务器
- 存储方式采用key-value键值对，这里面的value只能存字符串类型，如果存其他的会自动转换成字符串
- 存储上限限制达到了5MB，如果当存储超出上限新的内容会把旧的内容覆盖但不会报错


### SessionStorage属性

| 属性 | 说明 |
| --- | --- |
| `sessionStorage.length` | 键值对数量 |
| `sessionStorage.key(int index)` | 读取第index个数据的名字或称为键值（从0开始计数） |
| `sessionStorage[string key]` | 获取sessionStorage仓库中当前键名的值 |
| `sessionStorage.getItem(string key)` | 读取数据 |
| `sessionStorage.setItem(string key, string value)` | 存储数据 |
| `sessionStorage.removeItem(string key)` | 删除某个具体数据 |
| `sessionStorage.clear()` | 清空sessionStorage上存储的数据 |

## localStorage

LocalStorage和SessionStorage十分相似，同样是key-value键值对，也是HTML5新增存储对象，它与SessionStorage的特点不同之处在于没有标签页的限制和在浏览器无痕模式下LocalStorage是不允许读取的。

LocalStorage永久性的存储。SessionStorage超出限制是覆盖不会报错而LocalStorage超出会报错。


### localStorage特点

- 同源策略，也就是在同一协议，同一主机名和同一端口下；
- 没有标签页的限制；
- 只在本地存储，不会跟随http请求发送到服务器；
- 存储方式采用key-value键值对，这里面的value只能存字符串类型，如果存其他的会自动转换成字符串；
- 存储上限达到了5MB，如果当前存储超出上限会报错；
- 无痕模式下不可读；
- 永久性存储。

### localStorage属性

| 属性 | 说明 |
| --- | --- |
| `localStorage.length` | 键值对数量 |
| `localStorage.key(int index)` | 读取第index个数据的名字或称为键值（从0开始计数） |
| `localStorage[string key]` | 获取localStorage仓库中当前键名的值 |
| `localStorage.getItem(string key)` | 读取数据 |
| `localStorage.setItem(string key)` | 存储数据 |
| `localStorage.removeItem(string key)` | 删除某个具体数据 |
| `localStorage.clear()` | 清空localStorage上存储的数据 |


### 监听storage的变化

监听storage包括SessionStorage和LocationStorage。然后这里提到两个概念：同源监听同源网页。

同源：协议、域名、端口三者相同，同源的情况下可以共享SessionStorage和LocationStorage。

同源策略还禁止不同源执行任何脚本

```
http://localhost:63342/simpleApp/app/index.html#/
(协议)  (域名)   (端口)         (路径)
```


### JSON对象与JavaScript对象

| 属性 | 说明 |
| --- | --- |
| `JSON.stringify()` | 使用`JSON.stringify()`方法将JavaScript对象转换为字符串 |
| `JSON.parse()` | 使用`JSON.parse()`方法将数据转换为JavaScript对象 |


## IndexedDB

### 什么是IndexedDB

IndexedDB简单理解就是前端数据库，提供了一种在用户浏览器中持久存储数据的方法，但是和前端关系型数据不同的是，IndexedDB采用的是key-value键值对存储，这种存储形式的数据库查询更简单快速，Indexed分别为同步和异步访问提供了单独的API，但是同步API仅提供在web worker内部使用，因此绝大多数情况下，使用的都是异步API，同时IndexedDB也无法突破同源策略的限制，只能访问在同域下的数据。


### 为什么要用IndexedDB

提到为什么要用IndexedDB就不得不提到常用缓存API localStorage和sessionStorage，这两个缓存API能满足开发时候的决大多数需求，简单的键值存储，但它们有它们的限制：

- 存储空间有限，只有5M；
- 只能存储字符串，存储对象类型的数据要用JSON.stringify和parse两个方法转换；
- 存储的字段一多就很难管理，存储的字段也无法产生关联

IndexedDB的存储空间没有限制，但是不同的浏览器可能会对IndexedDB中单个库的大小进行一定的限制，IndexedDB本质上还是一个数据库。可以存储大量结构化数据（包括文件/blobs），同时IndexedDB API通过索引的方式实现了数据的高性能搜索。


### IndexedDB使用步骤

#### 打开数据库

使用IndexedDB的第一步是打开数据库，使用 `indexedDB.open()` 方法。

```js
/**
* databaseName      数据库名称，如果指定数据库不存在，则会新建该名的数据库
* version           整数，表示数据库的版本号。打开已有数据库默认当前版本。新建数据库时，默认版本号为1
* 
* 返回一个 IDBRequest 对象。这个对象通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果。
*/
const request = window.indexedDB.open(databaseName, version);
```

**① error事件**

error事件表示打开数据库失败。

```js
request.onerror = (event) => {
  console.log('数据库打开报错');
};
```

**② success事件**

success事件表示成功打开数据库。

```js
let db = null;

request.onsuccess = (event) => {
  db = request.result;
  console.log('数据库打开成功');
}
```

这时，通过request对象的result属性拿到数据库对象。

**③ upgradeneeded事件**

如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。

```js
let db = null;

request.onupgradeneeded = (event) => {
  db = event.target.result;
}
```

这时通过事件对象的 `target.result` 属性，拿到数据库实例。


#### 新建数据库

新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。不同之处在于，后续的操作主要在upgradeneeded事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件。

通常，新建数据库以后，第一件事是新建对象仓库（即新建表）。

```js
let db = null;
// ...
request.onupgradeneeded = (event) => {
  db = event.target.result;
  // 判断数据库中是否已经存在该名称的数据表，如果不存在再新建
  if(!db.objectStoreNames.contains('person')) {
    // 新建数据库为person的数据库，以id为主键
    // db.createObjectStore('person', { autoIncrement: true }) 自动生成主键
    const objectStore = db.createObjectStore('person', { keyPath: 'id' });

    // 新建索引 IDBObject.createIndex()的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
  }
}
```


#### 新增数据

新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。

```js
const add = () => {
  /**
  * transaction 新建事物
  * IDBTransaction.objectStore(name) 拿到 IDBObjectStore 对象（对象仓库），再通过表格对象的add()方法，向表格写入一条记录
  * 写入操作是一个异步操作，通过监听连接对象的success事件和error事件，了解是否写入成功
  */
  const request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

  request.onsuccess = (event) => {
    console.log('数据写入成功');
  };

  request.onerror = (event) => {
    console.log('数据写入失败');
  }
}
```

#### 读取数据

读取数据也是通过事务完成。

```js
const read = () => {
   const transaction = db.transaction(['person'])
    .objectStore('person')
    .get(1);

   request.onerror = (event) => {
     console.log('事务失败');
   };

   request.onsuccess = (event) => {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}
```

上面代码中，`objectStore.get()` 方法用于读取数据，参数是主键的值。

#### 遍历数据

遍历数据表格的所有记录，要使用指针对象IDBCursor。

```js
const readAll = () => {
  const objectStore = db.transaction('person').objectStore('person');

   objectStore.openCursor().onsuccess = (event) => {
     const cursor = event.target.result;

     if (cursor) {
       console.log('Id: ' + cursor.key);
       console.log('Name: ' + cursor.value.name);
       console.log('Age: ' + cursor.value.age);
       console.log('Email: ' + cursor.value.email);
       cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}
```

上面代码中，新建指针对象的 `openCursor()` 方法是一个异步操作，所以要监听success事件。


#### 更新数据

更新数据要使用IDBObject.put()方法。

```js
// put()方法更新了主键为1的记录。
const update = () => {
  const request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

  request.onsuccess = (event) => {
    console.log('数据更新成功');
  };

  request.onerror = (event) => {
    console.log('数据更新失败');
  }
}
```


#### 删除数据

IDBObjectStore.delete()方法用于删除记录。

```js
const remove = () => {
  const request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}
```

#### 使用索引

索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。

假定新建表格的时候，对name字段建立了索引。

```js
objectStore.createIndex('name', 'name', { unique: false });
```

现在，就可以从name找到对应的数据记录了。

```js
const read = () => {
   const transaction = db.transaction(['person'])
    .objectStore('person')
    .index('name');
    .get('李四')

   request.onerror = (event) => {
     console.log('事务失败');
   };

   request.onsuccess = (event) => {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}
```

### IndexedDB应用场景

- 不需要网络连接的纯离线应用；
- 需要存储大量数据的应用，比如图书馆管理系统这类需要存储大量数据的应用，完全可以将书籍信息存储在IndexedDB中；
- 配合server worker构建pwa应用，用来缓存网络请求。


### IndexedDB 总结

总的来说，IndexedDB的应用频率并不高，这是由于IndexedDB适用复杂度和不多的适用场景决定的。
