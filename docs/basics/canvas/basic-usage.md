# 基本用法

```html
<canvas id="canvas" width="150" height="150"></canvas>
<!-- 浏览器不支持canvas时，在canvas标签中提供替换内容 -->
<canvas id="canvas" width="150" height="150">
  <img src="images/canvas.png" width="150" height="150" alt=""/>
</canvas>
```

`<canvas>` 看起来和 `<img>` 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。实际上，`<canvas>` 标签只有两个属性—— `width` 和 `height`。

当没有设置宽度和高度的时候，`<canvas>` 会初始化宽度为300像素和高度为150像素。该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。

`<canvas>` 元素可以像任何一个普通的图像一样（有 `margin`，`border`，`background` 等等属性）被设计。然而，这些样式不会影响在 `<canvas>` 中的实际图像。


## 渲染上下文

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

`<canvas>` 元素有一个叫做 `getContext()` 的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()` 只有一个参数，上下文的格式。

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```

代码第一行通过使用 `document.getElementById()` 方法来为 `<canvas>` 元素得到DOM对象。获取元素对象后，就可以通过使用它的 `getContext()` 方法来访问绘画上下文。

## 检查支持性

替换内容是用于在不支持 `<canvas>` 标签的浏览器中展示的。通过简单的测试 `getContext()` 方法的存在，脚本可以检查编程支持性。

```js
const canvas = document.getElementById('canvas');
if(canvas.getContext) {
  // 支持时
  const ctx = canvas.getContext('2d')
} else {
  // 不支持时   
}
```

## canvas 简单例子

```vue
<template>
  <div>
    <canvas id="canvas" height="100" width="100">
      浏览器不支持 canvas
    </canvas>
  </div>
</template>

<script>
  export default {
    name: "Basic",
    mounted() {
      const canvas = document.getElementById('canvas');
      if(canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 55, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, .5)';
        ctx.fillRect(30, 30, 55, 50);
      }
    }
  }
</script>

<style lang="scss">
  canvas {
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    margin: 10px;
  }
</style>
```

<Canvas-Basic />
