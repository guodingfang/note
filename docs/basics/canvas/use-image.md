# 使用图像

canvas更有意思的一项特性就是图像操作能力。可以用动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。

浏览器支持的任意格式的外部图片都可以使用，比如PNG、GIF或者JPEG。 甚至可以将同一个页面中其他canvas元素生成的图片作为图片源。

引入图像到canvas里需要以下两个基本操作：

- 获得一个指向 `HTMLImageElement` 的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片；
- 使用 `drawImage()` 函数将图片绘制到画布上。

## 获得需要绘制的图片

canvas的API可以使用下面这些类型中的一种作为图片的来源：

```js
// 这些图片是由Image()函数构造出来的，或者任何的元素
HTMLImageElement

// 用一个HTML的 <video>元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
HTMLVideoElement

// 可以使用另一个 <canvas> 元素作为你的图片源
HTMLCanvasElement

// 这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成
ImageBitmap
```


### 使用相同页面内的图片

可以通过下列方法的一种来获得与canvas相同页面内的图片的引用：

- `document.images` 集合；
- `document.getElementsByTagName()` 方法；
- 如果你知道你想使用的指定图片的id，你可以用 `document.getElementById()` 获得这个图片。


### 使用其他域名下的图片

在 `HTMLImageElement` 上使用 `crossOrigin` 属性，可以请求加载其他域名商的图片。如果图片的服务器允许跨域访问这个图片，那么可以使用这个图片而不污染canvas，否则，使用这个图片将会污染canvas。

### 使用其它 canvas 元素

和引用页面内的图片类似地，用 `document.getElementsByTagName()` 或 `document.getElementById()` 方法获取其他canvas元素。但引入的应该是已经准备好的canvas。

一个常用的应用就是将第二个canvas作为另一个大的canvas的缩略图。


### 由零开始创建图像

可以用脚本创建一个新的 `HTMLImageElement` 对象。要实现这个方法，我们可以使用很方便的 `Image()` 构造函数。

```js
const img = new Image();    // 创建一个<img>元素
img.src = 'myImage.png';    // 设置图片源地址
```

当脚本执行后，图片开始装载。

若调用 `drawImage` 时，图片没有加载完，那么什么也不会发生（在一些旧的浏览器中可能会抛出异常）。因此应该用 `load` 事件来保证不会在加载完毕之前使用这个图片：

```js
const img = new Image();  // 创建img元素
img.onload = () => {
  // 执行drawImage 语句
};
img.src = 'myImage.png';  // 设置图片源地址
```

如果你只用到一张图片的话，这已经够了。但一旦需要不止一张图片，那就需要更加复杂的处理方法（图片预加载策略）。

### 通过 Base64 方法嵌入图像

```js
img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
```

其优点就是图片内容即使可用，无须再去服务器请求一次，（还有一个优点是，可以将 CSS，JavaScript，HTML 和 图片全部封装在一起，迁移起来十分方便），缺点就是图像没法缓存，图片大的话内嵌的url数据会相当的长。


### 使用视频帧

还可以使用 `<video>` 中的视频帧（即便视频是不可见的）。例如，如果有一个ID为“myvideo”的 `<video>` 元素，可以这样做：

```js
function getMyVideo() {
  const ctx = document.getElementById('canvas').getContext('2d');
  return document.getElementById('myvideo');
}
```

它将为这个视频返回 `HTMLVideoElement` 对象，正如前面提到的，它可以作为canvas图片源。


## 绘制图片

一旦获得了源图对象，就可以使用 `drawImage` 方法将它渲染到canvas里。`drawImage` 方法有三种形态，下面是最基础的一种：

```js
/**
* image   image/canvas对象
* x,y     canvas里的坐标起始点
*/
drawImage(image, x, y)
```

<Canvas-DrawImage />

```vue
<template>
  <div>
    <canvas id="canvasDrawImage" width="300" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const canvas = document.getElementById('canvasDrawImage');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = function(){
        ctx.drawImage(img, 0, 0);
        ctx.beginPath();
        ctx.moveTo(30, 96);
        ctx.lineTo(70, 66);
        ctx.lineTo(103, 76);
        ctx.lineTo(170, 15);
        ctx.stroke();
      }
      img.src = 'https://mdn.mozillademos.org/files/206/Canvas_backdrop.png';
    }
  }
</script>

<style lang="scss">

</style>
```

## 缩放 Scaling

`drawImage()` 方法的又一变种是增加了两个用于控制图像在canvas中缩放的参数。

```js
/**
* image           image/canvas对象
* x,y             canvas里的坐标起始点
* width,height    画入图片时图片缩放大小
*/
drawImage(images, x, y, width, height)
```

```js
const ctx = document.getElementById('canvas').getContext('2d');
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 50, 38, 50, 38);
};
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
```

## 切片 Slicing

`drawImage()` 方法的第三个也是最后一个变种有8个新参数，用于控制做切片显示的。

```js
/**
* 前4个参数是定义图像源的切片位置和大小。
* 后4个参数则是定义切片的目标显示位置和大小。
*/
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

```js
const ctx = document.getElementById('canvas').getContext('2d');
const img = document.getElementById('source');
ctx.drawImage(img, 33, 71, 104, 124, 21, 20, 87, 104);
```


## 控制图像的缩放行为

Gecko 1.9.2 引入了 `mozImageSmoothingEnabled` 属性，值为false时，图像不会平滑地缩放。默认是true。

```js
cx.mozImageSmoothingEnabled = false;
```

