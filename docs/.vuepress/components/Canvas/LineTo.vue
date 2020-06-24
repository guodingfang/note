<template>
  <div>
    <canvas id="canvasLineTo" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const canvas = document.getElementById('canvasLineTo');
      if(canvas.getContext) {
        const ctx = canvas.getContext('2d');
        // 填充三角形
        ctx.beginPath();
        ctx.moveTo(25, 25);
        ctx.lineTo(105, 25);
        ctx.lineTo(25, 105);
        ctx.fill();

        // 描边三角形
        ctx.beginPath();
        ctx.moveTo(125, 125);
        ctx.lineTo(125, 45);
        ctx.lineTo(45, 125);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
</script>

<style lang="scss">

</style>
