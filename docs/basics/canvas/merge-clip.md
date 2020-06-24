# 合成与裁剪


## globalCompositeOperation

不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分。

`globalCompositeOperation = type`

这个属性设定了在画新图形时采用的遮盖策略，其值是一个标识12种遮盖方式的字符串。[详情](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing)


## 裁切路径

裁切路径和普通的canvas图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。

```js
// 将当前正在构建的路径转换为当前的裁剪路径。
clip()
```

<Canvas-Clip />

用一个圆形的裁切路径来限制随机星星的绘制区域。

```vue
<template>
  <div>
    <canvas id="canvasClip" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const ctx = document.getElementById('canvasClip').getContext('2d');
      ctx.fillRect(0,0,150,150);
      ctx.translate(75,75);

      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI*2, true);
      ctx.clip();

      const lingrad = ctx.createLinearGradient(0, -75, 0, 75);
      lingrad.addColorStop(0, '#232256');
      lingrad.addColorStop(1, '#143778');
      ctx.fillStyle = lingrad;
      ctx.fillRect(-75, -75, 150, 150);

      for (let j = 1; j < 50; j++) {
        ctx.save();
        ctx.fillStyle = '#FFF';
        ctx.translate(75-Math.floor(Math.random()*150), 75-Math.floor(Math.random()*150));
        this.drawStar(ctx, Math.floor(Math.random()*4)+2);
        ctx.restore();
      }
    },

    methods: {
      drawStar(ctx, r) {
        ctx.save();
        ctx.beginPath()
        ctx.moveTo(r,0);

        for (let i = 0; i < 9; i++) {
          ctx.rotate(Math.PI/5);
          if(i%2 == 0) {
            ctx.lineTo((r/0.525731)*0.200811, 0);
          } else {
            ctx.lineTo(r, 0);
          }
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  }
</script>

<style lang="scss">

</style>
```

首先，画了一个与canvas一样大小的黑色方形作为背景，然后移动原点至中心点。然后用 `clip()` 方法创建一个弧形的裁切路径。裁切路径也属于canvas状态的一部分，可以被保存起来。如果在创建新裁切路径时想保留原来的裁切路径，需要做的就是保存一下canvas的状态。

裁切路径创建之后所有出现在它里面的东西才会画出来。在画线性渐变时我们就会注意到这点。然后会绘制出50颗随机位置分布（经过缩放）的星星，当然也只有在裁切路径里面的星星才会绘制出来。
