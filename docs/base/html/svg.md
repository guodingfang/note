# SVG 

## 概论

SVG是一种基于XML语法的图像格式，全称是可缩放矢量图。其他图像格式都是基于像素处理的，SVG则是属于图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

SVG文件可以直接插入网页，成为DOM的一部分，然后用JavaScript和CSS进行操作。

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<svg
  id="mysvg"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 800 600"
  preserveAspectRatio="xMidYMid meet"
>
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
</body>
</html>
```

SVG代码也可以写在一个独立文件中，然后用`<img>`、`<object>`、`<embed>`、`<iframe>`等标签插入网页

```html
<img src="circle.svg" />
<object id="object" data="circle.svg" type="image/svg+xml"></object>
<embed id="embed" src="icon.svg" type="image/svg+xml">
<iframe id="iframe" src="icon.svg"></iframe>
```

CSS也可以使用SVG文件

```css
.logo {
  background: url(icon.svg);
}
```

SVG 文件还可以转为 BASE64 编码，然后作为 Data URI 写入网页。

```html
<img src="data:image/svg+xml;base64,[data]">
```

## 语法

### 标签 `<svg>`

SVG代码都放在顶层标签`<svg>`之中。如下：

```html
<svg width="100%" height="100%">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

`<svg>`的`width`属性和`height`属性，指定了`SVG`图像在`HTML`元素中所占据的宽度和高度。除了相对单位，也可以采用绝对单位（单位：像素）。如果不指定这两个属性，SVG图像默认大小是300像素（宽）x 150像素（高）。

如果只想展示SVG图像的一部分，就要指定`viewBox`属性。

```html
<svg width="100" height="100" viewBox="50 50 50 50">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

`<viewBox>`属性的值有四个数字，分别是左上角的横坐标和纵坐标、视口的宽度和高度。上面代码中，`SVG`图像是100像素宽 x 100像素高，`viewBox`属性指定视口从(50, 50)这个点开始。所以，实际看到的是右下角的四分之一圆。

> 注意，视口必须适配所在的空间。上面代码中，视口的大小是 50 x 50，由于 SVG 图像的大小是 100 x 100，所以视口会放大去适配 SVG 图像的大小，即放大了四倍。

如果不指定`width`属性和`height`属性，只指定`viewBox`属性，则相当于只给定`SVG`图像的长宽比。这时`SVG`图像的默认大小将等于所在的`HTML`元素的大小。

### 圆形 `<circle>`

`<circle>`标签代表圆形。

<Svg-Circle />

```html
<svg width="300" height="100">
  <circle cx="30" cy="50" r="25" />
  <circle cx="90"  cy="50" r="25" class="red" />
  <circle cx="150" cy="50" r="25" class="fancy" />
</svg>
```

上面的代码定义了三个圆。`<circle>`标签的`cx`、`cy`、`r`属性分别为横坐标、纵坐标和半径，单位是像素。坐标都是相对于`<svg>`画布左上角原点。

`class`属性用来指定对应的CSS类。
```css
.red {
  fill: red
}
.fancy {
  fill: none;
  stroke: black;
  stroke-width: 3pt;
}
```

SVG的CSS属性与网页元素有所不同
> * fill: 填充色
> * stroke: 描边色
> * stroke-width: 边框宽度

### 直线 `<line>`

`<line>`标签用来绘制直线。

<Svg-Line />

```html
<svg width="300" height="100">
  <line x1="0" y1="0" x2="200" y2="0" style="stroke: rgb(0, 0, 0); stroke-width: 5" />
</svg>
```
上面代码中，`<line>`标签的`x1`属性和`y1`属性，表示线段起点的横坐标和纵坐标；`x2`属性和`y2`属性，代表线段终点的横坐标和纵坐标；`style`属性表示线段的样式。

### 折线 `<polyline>`

`<polyline>`标签用于绘制一根折线

<Svg-Polyline />

```html
<svg width="300" height="100">
  <polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
</svg>
```
`<polyline>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间是逗号分割，点与点之间用空格分割。

### 矩形 `<rect>`

<Svg-Rect />

```html
<svg width="300" height="180">
  <rect x="0" y="50" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
</svg>
```

`<rect>`的x属性和y属性，指定了矩形左上角端点的横坐标和纵坐标；width属性和height属性指定了矩形的宽度和高度（单位像素）。

### 椭圆 `<ellipse>`

`<ellipse>`标签用于绘制椭圆。

<Svg-Ellipse />

```html
<svg width="300" height="120">
  <ellipse cx="120" cy="60" ry="40" rx="80" stroke="black" stroke-width="5" fill="silver"/>
</svg>
```

`<ellipse>`的cx属性和cy属性，指定了椭圆中心的横坐标和纵坐标（单位像素）；rx属性和ry属性，指定了椭圆横向轴和纵向轴的半径（单位像素）

### 多边形 `<polygon>`

<Svg-Polygon />

`<polygon>`标签用于绘制多边形

```html
<svg width="300" height="180">
  <polygon fill="green" stroke="orange" stroke-width="1" points="20,20 100,40 100,100 0,100 80,80"/>
</svg>
```

`<polygon>`的points属性指定了每个端点的坐标，横坐标与纵坐标之间用逗号分开，点与点之间用空格分隔。

### 路径 `<path>`

`<path>`标签用于绘制路径

<Svg-Path />

```html
<svg width="300" height="100">
  <path d="
    M 18,3
    L 46,3
    L 46,40
    L 61,40
    L 32,68
    L 3,40
    L 18,40
    Z
  "></path>
</svg>
```

`<path>`的d属性表示绘制顺序，它的值是一个长字符串，每个字母表示一个绘制动作，后面跟着坐标。
> - M：移动到（moveto）
> - L：画直线到（lineto）
> - Z：闭合路径

### 文本 `<text>`

`<text>`标签用于绘制文本

<Svg-Text />

```html
<svg width="300" height="100">
  <text x="50" y="25">Hello World</text>
</svg>
```

`<text>`的`x`属性和`y`属性，代表文本区块基线（baseline）起点的横坐标和纵坐标。文字的样式可以用`class`或`style`属性指定。


### 复制一个形状 `<use>`

`<use>`标签用于复制一个形状。

<Svg-Use />

```html
<svg viewBox="0 0 30 10">
  <circle id="myCircle" cx="5" cy="5" r="4"/>
  <use href="#myCircle" x="10" y="0" fill="blue" />
  <use href="#myCircle" x="20" y="0" fill="white" stroke="blue" />
</svg>
```

`<use>`的`href`属性指定所要复制的节点，x属性和y属性是`<use>`左上角的坐标。另外，还可以指定width和height坐标。

### 多个形状组成一个组 `<g>`

`<g>`标签用于将多个形状组成一个组（group），方便复用。

<Svg-G />

```html
<svg width="300" height="100">
  <g id="myCircle2">
    <text x="35" y="20">圆形</text>
    <circle cx="50" cy="50" r="20" />
  </g>

  <use href="#myCircle2" x="100" y="0" fill="blue" />
  <use href="#myCircle2" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

### 自定义形状 `<defs>`

`<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。

<Svg-Defs />

```html
<svg>
  <defs>
    <g id="myCircle3">
      <text x="25" y="20">圆形</text>
      <circle cx="50" cy="50" r="20" />
    </g>
  </defs>

  <use href="#myCircle3" x="0" y="0" />
  <use href="#myCircle3" x="100" y="0" fill="blue" />
  <use href="#myCircle3" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

### 自定义形状 `<pattern>`

`<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。

<Svg-Pattern />

```html
<svg width="500" height="500">
  <defs>
    <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle fill="#bee9e8" cx="50" cy="50" r="35" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
</svg>
```

### 插入图片文件 `<image>`

`<image>`标签用于插入图片文件。

```html
<svg viewBox="0 0 100 100" width="100" height="100">
  <image xlink:href="path/to/image.jpg" width="50%" height="50%"/>
</svg>
```

上面代码中，`<image>`的`xlink:href`属性表示图像的来源。


### 动画效果 `<animate>`

`<animate>`标签用于产生动画效果。

<Svg-Animate />

```html
<svg width="500px" height="500px">
  <rect x="0" y="0" width="100" height="100" fill="#feac5e">
    <animate attributeName="x" from="0" to="500" dur="5s" repeatCount="indefinite" />
  </rect>
</svg>
```

上面代码中，矩形会不断移动，产生动画效果。

`<animate>`的属性含义如下：

> - attributeName：发生动画效果的属性名。
> - from：单次动画的初始值。
> - to：单次动画的结束值。
> - dur：单次动画的持续时间。
> - repeatCount：动画的循环模式。

### 变形 `<animateTransform>`

`<animate>`标签对CSS的transform属性不起作用，如果需要变形，就需要使用`<animateTransform>`标签。

<Svg-AnimateTransform />

```html
<svg width="500px" height="350px">
  <rect x="100" y="100" width="50" height="50" fill="#4bc0c8">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 100 100" to="360 200 200" repeatCount="indefinite" />
  </rect>
</svg>
```

上面代码中，`<animateTransform>`的效果为旋转`rotate`，这时`from`和`to`属性值有三个数字，第一个数字是角度值，第二个值和第三个值是旋转中心的坐标。`from="0 100 100"`表示开始时，角度为0，围绕`(100, 100)`开始旋转；`to="360 200 200"`表示结束时，角度为360，围绕（200， 200）旋转。


## JavaScript操作

### DMO操作

如果SVG代码直接写在HTML网页之中，它就是网页DOM的一部分，可以直接用DOM操作。

```html
<svg id="mysvg">
  <circle id="mycircle" cx="70" cy="70" r="50" @click="click" />
</svg>
```

用CSS制定样式

```scss
circle {
  stroke-width: 5;
  stroke: #f00;
  fill: #ff0;
}

circle:hover {
  stroke: #090;
  fill: #fff;
}
```
然后，可以用JavaScript代码操作SVG。

```js
click(e) {
  const r = Number(e.target.getAttribute('r'));
  const _r =  r % 20 ? r + 10 : r - 10;
  e.target.setAttribute('r', _r)
}
```

用上面代码，如果点击圆形，就改写`circle`元素的`r`属性。

<Svg-Dom />


## SVG与Canvas的对比：

| 方面 | SVG | Canvas |
| :---: | --- | ------ |
| 描述 | 1. 一种使用XML描述的2D图形的语言<br />2. SVG基于XML意味着，SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器<br />3. 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。 | 1. 通过Javascript来绘制2D图形<br /> 2. 是逐像素进行渲染的<br />3. 其位置发生改变，会重新进行绘制 |
| 对分辨率依赖 | 不依赖分辨率 | 依赖分辨率 |
| 对事件处理器支持| 支持事件处理器 | 不支持事件处理器 |
| 渲染能力 | 最适合带有大型渲染区域的应用程序（比如谷歌地图）| 弱的文本渲染能力 |
| 是否适用于游戏应用 | 不适合游戏应用 | 最适合图像密集型的游戏，其中的许多对象会被频繁重绘 |
| —— | 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快） | 能够以 .png 或 .jpg 格式保存结果图像 |
