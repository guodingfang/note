<template>
  <div>
    <canvas id="canvasMoveTo" height="150" width="150"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = document.getElementById('canvasMoveTo');
    if(canvas.getContext) {
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
    }
  }
}
</script>

<style lang="scss">

</style>
