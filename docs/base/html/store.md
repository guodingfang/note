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

### 什么是 IndexedDB

IndexDB 简单理解就是前端数据库，提供了一种在用户浏览器中持久存储数据的方法，但是和前端关系型数据不同的是，IndexedDB 采用的是 key-value 键值对存储，这种存储形式的数据库查询更简单快速，IndexedDB 分别为同步和异步访问提供了单独的API，但是同步 API 仅提供在 web worker 内部使用，因此绝大多数情况下，使用的都是异步 API，同时 IndexedDB 也无法突破同源策略的限制，只能访问在同域下的数据。

### 为什么要用 IndexedDB

提到为什么要用 IndexedDB 就不得不提到常用的缓存 API localStorage 和 sessionStorage，这两个缓存API能满足开发时候的绝大多数需求，简单的键值存储，但是它们有它们的限制：
* 存储空间有限，只有5M,
* 只能存储字符串，存储对象类型的数据要用 JSON.stringify 和 parse 两个方法转换。
* 存储的字段一多就很难管理，存储的字段也无法产生关联

IndexedDB 的存储空间是没有限制，但是不同浏览器可能会对 IndexedDB 中单个库的大小进行一定的限制，IndexedDB 本质上还是一个数据库，可以存储大量结构化数据（包括文件/blobs），同时 IndexedDB API 通过索引的方式实现了数据的高性能搜索。

### IndexedDB 使用步骤

#### 1. 打开/新建数据库

使用 indexedDB.open() 方法
```js
/**
* databaseName      数据库名称，如果指定数据库不存在，则会新建该名的数据库
* version           整数，表示数据库的版本号。打开已有数据库默认当前版本。新建数据库时，默认版本号为1
* @type {IDBOpenDBRequest}
*/
const request = widnow.indexedDB.open(databaseName, version);
```
`indexedDB.open()` 方法返回一个 IDBRequest 对象。这个对象通过以下三种事件处理打开数据库的操作结果。

**① onerror：打开数据库失败**

```js
require.onerror = (event) => {
  console.log('数据库打开错误')
}
```

**② success：打开数据库成功**

```js
let db = null;
require.onsuccess = (event) => {
  db = request.result;
  console.log('数据库打开成功');
}
```

**③ upgradeneeded：数据库版本升级或创建数据库时触发,在该事件中创建数据表**

```js
let db = null;
require.onupgradeneeded = (event) => {
  db = event.target.result;
  // 判断数据库中是否已经存在该名称的数据表
  if (!db.objecttables.container('table')) {
    objectStore = db.createObjectStore('table', { keyPath: 'id' }); 
    objectStore.createIndex('name', 'name', { unique: false }); 
    objectStore.createIndex('age', 'age', { unique: true }); 
  }
}
```
`db.createObjectStore('table', { keyPath: 'id' })` 表示新建名称为 table 的表，主键是id，主键（key）是默认建立索引的属性。

如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键

```js
const objectStore = db.createObjectStore('table',{ autoIncrement: true });
```

`objectStore.createIndex('name', 'name', { unique: false })` 表示建立索引，可根据索引查询指定条件的数据，可建立多条索引；三个参数分别表示为：索引名称，索引所在的属性，该属性是否包含相同的值。

#### 2. 新增/更新数据

```js
const changeData = () => {
  const request = db.transaction(['table'], 'readwrite')  // readwrite表示有读写权限
  .objectStore('table')
  .add({ id: 1, name: 'leiyin', age: 24 }); // 新增数据
  或
  .put({ id: 1, name: 'leiyin', age: 24 }); // 更新数据
  
  request.onsuccess = (event) => {
    console.log('数据写入成功');
  };
  
  request.onerror = (event) => {
    console.log('数据写入失败')
  }
}

changeData();
```

> indexedDB 都是异步操作，具体操作可以在回调函数中写

#### 3. 读取数据

**① 根据主键读取数据**

`objectStore.get()` 方法用于读取数据，参数是主键的值。
```js
function read() {
  const transaction = db.transaction(['table']);
  const objectStore = transaction.objectStore('table');
  const request = objectStore.get(1);
  request.onerror = function(event) {
   console.log('事务失败');
  };
  request.onsuccess = function( event) {
    if (request.result) {
      console.log(request.result);
    } else {
      console.log('未获得数据记录');
    }
  };
}
read();
```

**② 根据主键读取数据**

使用索引能自定义字段进行搜索，如果不建立索引则只能通过主键搜索。

```js
const transaction = db.transaction(['table'], 'readonly');
const store = transaction.objectStore('table');
const index = store.index('name');
const request = index.get('leiyin');
request.onsuccess = function (e) {
  const result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```

**③ 通过游标和索引读取数据**

上述只能读取到匹配条件的第一条数据记录，假如要获取多条满足条件的数据记录，则要使用游标。

游标与索引结合能将通过游标将所有满足所有条件的数据全部拿到。

```js
const store = db.transaction('table','readwrite').objectStore('table');
const index = store.index('name');
const request=index.openCursor(IDBKeyRange.only('leiyin'));
request.onerror = function(e){}
request.onsuccess = function(e){
  console.log('游标开始查询');
  const cursor = e.target.result;
  if(cursor){//必须要检查
    console.log(cursor);
    cursor.continue();//遍历了存储对象中的所有内容
  } else {
    //...
  }
};
```

#### 4. 删除数据

**① 根据主键删除数据**

```js
function remove() {
  const request = db.transaction(['table'], 'readwrite')
    .objectStore('table')
    .delete(1);
  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}
remove();
```

**②  通过游标和索引删除数据**

```js
function cursorDeldteData(db,table){
  //通过游标删除记录
  const store = db.transaction(table,'readwrite').objectStore(table);
  const request = store.openCursor();
  request.onsuccess = function(e){
    let cursor = e.target.result,
      value,
      deleteRequest;
    if(cursor){
      deleteRequest = cursor.delete();  // 请求删除当前项
      deleteRequest.onerror = function(){
        console.log('游标删除该记录失败');
      };
      cursor.continue();
    }
  };
}
```

#### 5. 清除数据表中的数据

由于删除数据库后不能重新创建相同名称的数据库，而项目又需要对相同名称的数据库进行操作，可以选择了清除数据库中的所有表内的数据

```js
function clear(db,table){
  //删除存储空间全部记录
  const store = db.transaction(table,'readwrite').objectStore(table);
  store.clear();
  console.log('已删除存储空间'+table+'全部记录');
}
clear();
```

#### 6. 删除数据库

```js
indexedDB.deleteDatabase(DatabaseName); 
```

> 经测试发现，删除数据库成功后，不能再创建相同名称的数据库。!!!

### IndexedDB 应用场景

* 不需要网络连接的纯离线应用
* 需要存储大量数据的应用，比如图书馆管理系统这类需要存储大量数据的应用，完全可以将书籍信息存储在 IndexedDB 中
* 配合 server worker 构建 pwa 应用，用来缓存网络请求

### IndexedDB 总结

总的来说，IndexedDB的应用频率并不高，这是由于IndexedDB适用复杂度和不多的适用场景决定的。

