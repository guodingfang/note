<template>
  <div>
    <canvas id="canvasText" width="500" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const ctx = document.getElementById('canvasText').getContext('2d');
      ctx.font = '48px serif';
      ctx.fillText('Hello world', 10, 50, 300);
      ctx.strokeText('Hello world', 10, 100, 300);
      ctx.font = '16px serif';
      ctx.fillText('填充文本', 300, 50);
      ctx.strokeText('绘制文本边框', 300, 100);
    }
  }
</script>

<style lang="scss">

</style>
