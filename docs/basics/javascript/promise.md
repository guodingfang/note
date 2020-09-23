# Promise

## 什么是Promise

Promise是异步编程的一种解决方案，它有三种状态，分别是：

- pending（进行中）
- resolved（已完成）
- rejected（已失败）

当Promise的状态由pending转变成resolved或rejected时，会执行相应的方法，并且状态一旦改变，就无法再次改变状态。

## 声明Promise对象

```js
let promise = new Promise((resolve, reject) => {
 if(success) {
    resolve(res);     // pending   ---> resolved    参数将传递给对应的回调方法
  } else {
    reject(err);      // pending   ---> rejected
  }
})
```
注意：实例化的Promise对象会立即执行。

## Promise方法

> `Promise.prototyoe.then() VS Promise.prototype.catch()`

`.then()`方法使用Promise原型链上的方法，它包含两个参数方法，分别是已经成功的`resolve`的回调和已经失败的`reject`的回调。

```js
promise.then(() => {
  console.log('this is success callback')
}, () => {
  console.log('this is fail callback')
})
```

`.catch()`的作用是捕获Promise的错误，与`.then()`的rejected回调作用几乎一致。

但由于Promise的抛错具有冒泡性质，能够不断传递，这样就能够在下一个`.catch()`中统一处理这些错误。

同样`.catch()`也能捕获`.then()`中抛出的错误，所以建议不要使用`.then()`的rejected回调，而是统一使用`.catch()`来处理错误

```js
promise.then(
  () => { console.log('this is success cakkback') }
).catch (
  (err) => { console.log(err) }
)
```

同时，`.catch()`中可以抛出错误，由于抛出的错误会在下一个`.catch()`中被捕获处理，因此可再添加`.catch()`。

使用`reject()`方法改变状态和抛出错误`throw new Error()`的作用是相同的，当状态已经改变为`resolved`后，即使抛除错误，也不会触发`.then()`的错误回调或者`.catch()`方法。

`.then()`和`.catch()`都会返回一个新的Promise对象，可以链式调用。

```js
promise.then(
  () => { console.log('this is success callback') }
).catch(
  (err) => { console.log(err) }
).then(
  // ...
).catch(
  // ...
)
```

## Promise的其他api

### `Promise.resolve()` / `Promise.reject()`

用来包装一个现有对象，将其转变为Promise对象，但`Promise.resolve()`会根据参数的情况返回不同的Promise：

- 参数是Promise：原样返回。
- 参数带有`.then()`方法：转换为Promise后立即指向`.then()`方法。
- 参数不带`.then()`方法、不是对象或没有参数：返回resolved状态的Promise。

`Promise.reject()`会直接返回rejected状态的Promise。

### `Promise.all()`

参数为Promise对象数组，如果有不是Promise的对象，将会先通过上面的`Promise.resolve()`方法转换

```js
const promise = Promise.all([p1, p2, p3]);
promise.then(
  // ...
).catch(
  // ...
)
```

当p1，p2，p3的状态都变成resolved时，promise才会变成resolved，并强调`.then()`的已完成回调，但只要有一个变成rejected状态，promise就会立刻变成rejected的状态。

### `Promise.race()`

```js
const promise = Promise.race([p1, p2, p3]);
promise.then(
  // ...                              
).catch(
  // ...                                 
)
```

"竞速"方法，参数与`Promise.all()`相同，不同的是，参数中的p1、p2、p3只要有一个改变状态，promise就会立刻变成相同的状态并执行对应的回调。
