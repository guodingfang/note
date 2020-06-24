# 添加样式和颜色

## 色彩 Colors

想要给图形上色，有两个重要的属性可以做到：`fillStyle` 和 `strokeStyle`。

```js
// 设置图形的填充颜色
fillStyle = color;
// 设置图形轮廓的颜色
strokeStyle = color;
```

`color` 可以是表示CSS颜色的字符串，渐变对象或者图案对象。默认情况下，线条和填充颜色都是黑色(CSS 颜色值 `#000000`)

:::warning
注意: 一旦设置了 strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，需要重新设置 fillStyle 或 strokeStyle 的值。
:::

```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

| 设置颜色的方法 | 展示 |
| --- | --- |
| `fillStyle` | <Canvas-FillStyle /> |
| `strokeStyle` | <Canvas-StrokeStyle /> |


## 透明度 Transparency

通过设置 `globalAlpha` 属性使用一个透明度的颜色作为轮廓或填充的样式。

```js
globalAlpha = transparencyValue
```

这个属性影响到 `<canvas>` 里所有图形的透明度，有效的值范围是0.0（完全透明）到1.0（完全不透明），默认是1.0。

也可以直接使用CSS3色彩规范来规定透明度：

```js
// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```




## 线型 Line styles

可以通过一系列属性来设置线的样式。

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

## 渐变 Gradients

可以用线性或者径向的渐变来填充或描边，可以用下面的方法新建一个 `canvasGradient` 对象，并且赋给图形 `fillStyle` 或 `strokeStyle` 属性。

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

创建出 `canvasGradient` 对象后，就可以用 `addColorStop` 方法给它上色。

```js
/**
* addColorStop 方法接受 2 个参数
* position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置
* ——例如，0.5 表示颜色会出现在正中间
* color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）
*/
gradient.addColorStop(position, color);
```

<Canvas-LinearGradient />

```vue
<template>
  <div>
    <canvas id="canvasLinearGradient" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const canvas = document.getElementById('canvasLinearGradient');
      if(canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const lingrad = ctx.createLinearGradient(0, 0, 0, 150);
        lingrad.addColorStop(0, '#00ABEB');
        lingrad.addColorStop(0.5, '#fff');
        lingrad.addColorStop(0.5, '#26C000');
        lingrad.addColorStop(1, '#fff');
        ctx.fillStyle = lingrad;

        ctx.fillRect(10,10,130,130);
      }
    }
  }
</script>

<style lang="scss">

</style>
```


<Canvas-RadialGradient />


```vue
<template>
  <div>
    <canvas id="canvasRadialGradient" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const ctx = document.getElementById('canvasRadialGradient').getContext('2d');
      const radgrad = ctx.createRadialGradient(45,45,20,70,70,70);
      radgrad.addColorStop(0, '#A7D30C');
      radgrad.addColorStop(0.9, '#019F62');
      radgrad.addColorStop(1, 'rgba(1,159,98,0)');
      ctx.fillStyle = radgrad;
      ctx.fillRect(0,0,150,150);
    }
  }
</script>

<style lang="scss">

</style>
```


## 图案样式 Patterns

`createPattern(image, type)` 该方法接受两个参数。`image` 可以是一个Image对象的引用，或者另一个canvas对象。`type` 必须是下面的字符串之一：`repeat`，`repeat-x`，`repeat-y`，`no-repeat`。

<Canvas-Patterns />


```vue
<template>
  <div>
    <canvas id="canvasPatterns" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const ctx = document.getElementById('canvasPatterns').getContext('2d');
      const img = new Image();
      img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
      img.onload = function () {
        const pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 150, 150);
      }
    }
  }
</script>

<style lang="scss">

</style>
```

## 阴影 Shadows

```js
/**
* shadowOffsetX 和 shadowOffsetY 用来设置阴影在X和Y轴的延伸距离，它们是不受变化矩形阵影响的。
* 负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为0。
*/
shadowOffsetX = float;
shadowOffsetY = float;

/**
* shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为0。
*/
shadowBlur = float;

/**
* shadowColor 是标准的CSS颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
*/
shadowColor = color;
```

<Canvas-Shadows />
