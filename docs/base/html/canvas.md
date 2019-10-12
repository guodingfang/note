# canvas

## 基本用法

```html
<canvas id="canvas" width="150" height="150"></canvas>
<!-- 浏览器不支持canvas时，在canvas标签中提供替换内容 -->
<canvas id="canvas" width="150" height="150">
  <img src="images/canvas.png" width="150" height="150" alt=""/>
</canvas>
```

### 渲染上下文

\<canvas>元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

document.getElementById()方法来为 \<canvas>元素得到DOM对象。

一旦有了元素对象，就可以通过getContext()方法来绘制上下文。


```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
```

### 检查支持性

替换内容是用在不支持\<canvas>标签的浏览器中展示的。通过简单的测试getContext()方法的存在，脚本可以检查编程支持性。

```js
const canvas = document.getElementById('canvas');

if(canvas.getContext) {
  // 支持时
  const ctx = canvas.getContext('2d')
} else {
  // 不支持时   
}
```


## 绘制形状

### 栅格

HTML模板中有个宽150px, 高150px的canvas元素，canvas元素默认被网格所覆盖。通常来说网格中的一个单元相当于canvas元素中的一像素，栅格的起点为左上角（坐标为（0,0））。

所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））。

![栅格](../images/canvas_default_grid.png)


### 绘制矩形

不同于SVG，HTML中的元素canvas只支持一种原生的图形绘制：矩形。所有其他的图形的绘制都至少需要生成一条路径。

canvas提供了三种方法绘制矩形的：
```js
// 绘制一个填充的矩形
fillRect(x, y, width, height);
// 绘制一个矩形的边框
strokeRect(x, y, width, height);
// 清除指定矩形区域，让清除部分完全透明。
clearRect(x, y, width, height);
```

| 展示 | 步骤 |
| --- | --- |
| <Canvas-Rect /> |  |



<Canvas-Demo />
