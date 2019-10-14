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
| <Canvas-Rect /> | ```1.  ctx.fillRect(25, 25, 100, 100)``` <br /> ```2. ctx.clearRect(45, 45, 60, 60)```<br /> ```3. ctx.strokeRect(50, 50, 50, 50)``` |
 
fillRect()函数绘制了一个边长为100px的黑色正方形, clearRect()函数从正方形的中心开始擦出了一个60\*60px的正方形，接着strokeRect()在清除区域内生产一个50\*50的正方形边框。


### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段和曲线相连形成不同的形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，需要创建路径起始点。
2. 然后使用画图命令去画出路径。
3. 之后把画出的路径封闭。
4. 一旦生成路径，就能通过描边或填充路径区域来渲染图形。

所用到的函数：
```js
// 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
beginPath();
// 闭合路径之后图形绘制命令又重新指向到上下文中。
closePath();
// 通过线条来绘制图形轮廓。
stroke();
// 通过填充路径的内容区域生成实心的图形。
fill();
```
| 展示 | 步骤 |
| --- | --- |
| <Canvas-Path /> | ``` 1. ctx.beginPath(); ``` <br /> ```2. ctx.moveTo(75, 50); ``` <br /> ``` 3. ctx.lineTo(100, 75);```<br /> ``` 4. ctx.lineTo(100, 25); ```<br />``` 5. ctx.fill();```|

#### 移动笔触

```moveTo()```一个非常有用的函数，这个函数实际上不能画出任何东西，也是上面所描述的路径列表的一部分。将画笔的的笔尖出一个点移动到另一个点的过程。

```js 
// 将笔触移动到指定的坐标x以及y上
moveTo()
```

当canvas初始化或者beginPath()调用后，通常会使用moveTo()函数设置起点；也能够使用moveTo()绘制一些不连续的路径。



<Canvas-MoveTo />

```js
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.arc(75, 75, 50 ,0 ,Math.PI*2 ,true); // 绘制
ctx.moveTo(110, 75);
ctx.arc(75, 75, 35 ,0 ,Math.PI, false);   // 口(顺时针)
ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI*2, true);  // 左眼
ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI*2, true);  // 右眼
ctx.stroke();
```

#### 线

绘制直线，需要用到方法```lineTo()```。

```js
// 绘制一条从当前位置到指定x以及y位置的直线
lineTo(x, y);
```

使用```lineTo()```绘制图形时，需要注意填充方式，使用```fill()```填充路径生成实心图形，不需要使用```closePath()```，当使用```stroke()```绘制图形轮廓时，需要先使用```closePath()```闭合图形才可以。


#### 圆弧

绘制圆弧或者圆，使用arc()方法。当然可以使用arcTo()，不过这个实现不可靠，不做讨论。
```js
/**
* x,y:            圆心所在位置
* radius:         半径
* startAngle:     开始位置
* endAngle:       结束位置
* anticlockwise   画圆方向（默认为顺时针）
* 
* arc函数中角的单位是弧度，不是角度——角度与弧度的js表达式:  弧度=(Math.PI/180)*角度
*/
arc(x, y, radius, startAngle, endAngle, anticlockwise)

```

#### 二次贝塞尔曲线及三次贝塞尔曲线
```js
// 绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
quadraticCurveTo(cp1x, cp1y, x, y)
// 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。 
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
```

![二次贝塞尔曲线及三次贝塞尔曲线](../images/canvas_curves.png) 

上图能够很好的描述两者的关系，二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色），而三次贝塞尔曲线有两个控制点。 


#### 矩形

直接在画布上绘制矩形的三个额外方法，```rect()```方法，将一个矩形添加到当前路径上。
```js
// 绘制一个左上角坐标为（x,y），宽高为width以及height的矩形
rect(x, y, width, height);
```
当该方法执行的时候，moveTo()方法自动设置坐标参数(0, 0)。也就是说，当前笔触自动重置回默认坐标。

### Path2D 对象

正如之前看到的，可以使用一系列的路径和绘图命令把对象"画"在画布上。为了简化代码和提高性能，Path2D对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。

怎么生成一个Path2D对象呢？

#### Path2D()
```js
/**
* Path2D()会返回一个新初始化的Path2D对象
* 可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量
*/

new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```

所有的路径方法比如moveTo, rect, arc或quadraticCurveTo等，如我们前面见过的，都可以在Path2D中使用。

Path2D API添加了addPath作为将path结合起来的方法。当你想要从几个元素中来创建对象时，这将会很实用。比如：```Path2D.addPath(path [, transform])```

<Canvas-Path2D />

```js
const ctx = canvas.getContext();

const rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);

const circle = new Path2D();
circle.moveTo(125, 35);
circle.arc(100, 35, 25, 0, 2 * Math.PI);

ctx.stroke(rectangle);
ctx.fill(circle);
```

#### 使用 SVG paths
新的Path2D API有另一个强大的特点，就是使用SVG path data来初始化canvas上的路径

这将使你获取路径时可以以SVG或canvas的方式来重用它们：
```js
const p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```

## 使用样式和颜色

### 色彩 Colors

想要给图形上色，有两个重要的属性可以做到：```fillStyle```和```strokeStyle```。
```js
// 设置图形的填充颜色
fillStyle = color;
// 设置图形轮廓的颜色
strokeStyle = color;
```
```color```可以是表示CSS颜色的字符串，渐变对象或者图案对象。默认情况下，线条和填充颜色都是黑色(CSS 颜色值```#000000```)

::: warning
注意: 一旦设置了 strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，需要重新设置 fillStyle 或 strokeStyle 的值。
:::

```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

### 透明度 Transparency
通过设置 globalAlpha 属性或者使用一个半透明颜色作为轮廓或填充的样式。
```js
globalAlpha = transparencyValue
```
这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。

可以直接用CSS3色彩规范来规定透明度：
```js
// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

### 线型 Line styles
可以通过一系列属性来设置线的样式
```js
// 设置线条宽度
lineWidth = value;
// 设置线条末端样式
lineCap = type;
// 设定线条与线条间接合处的样式
lineJoin = type;
// 限制当两条线相交时交接处最大长度
miterLimit = value;
// 返回一个包含当前虚线样式，长度为非负偶数的数组
getLineDash();
// 设置当前虚线样式
setLineDash();
// 设置虚线样式的起始偏移量
lineDashOffset = value
```

### 渐变 Gradients

可以用线性或者径向的渐变来填充或描边，可以用下面的方法新建一个```canvasGradient```对象，并且赋给图形```fillStyle```或```strokeStyle```属性。
```js
/**
 * createLinearGradient 方法接受 4 个参数
 * 表示渐变的起点 (x1,y1) 与终点 (x2,y2)
 */
createLinearGradient(x1, y1, x2, y2);

/**
* createRadialGradient 方法接受 6 个参数
* 前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆
* 后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆
*/
createRadialGradient(x1, y1, r1, x2, y2, r2);
```

创建出```canvasGradient```对象后，就可以用```addColorStop```方法给它上色。
```js
/**
* addColorStop 方法接受 2 个参数
* position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置
* ——例如，0.5 表示颜色会出现在正中间
* color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）
*/
gradient.addColorStop(position, color);
```
| 线性渐变 | 径向渐变 |
|---|---|
|<Canvas-LinearGradient /> | <Canvas-RadialGradient /> |

<Canvas-Demo />
