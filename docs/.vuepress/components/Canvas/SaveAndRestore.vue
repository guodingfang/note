<template>
  <div>
    <canvas id="canvasSaveAndRestore" height="150" width="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const ctx = document.getElementById('canvasSaveAndRestore').getContext('2d');

      ctx.fillRect(0, 0, 150, 150);
      ctx.save();     // 保存默认状态

      ctx.fillStyle = '#09F';
      ctx.fillRect(15, 15, 120, 120);
      ctx.save();     // 保存当前状态

      ctx.fillStyle = 'rgba(255, 255, 255, .5)';
      ctx.fillRect(30, 30, 90, 90);

      ctx.restore();  // 重新加载之前的颜色状态
      ctx.fillRect(45, 45, 60, 60);

      ctx.restore();  // 加载默认颜色配置
      ctx.fillRect(60, 60, 30, 30)
    }
  }
</script>

<style lang="scss">

</style>
