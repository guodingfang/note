<template>
  <div>
    <canvas id="canvasBasic" height="100" width="100">
      浏览器不支持 canvas
    </canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const canvas = document.getElementById('canvasBasic');
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
