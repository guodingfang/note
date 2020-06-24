<template>
  <div>
    <canvas id="canvasStrokeStyle" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const cavnas = document.getElementById('canvasStrokeStyle');
      if(cavnas.getContext) {
        const ctx = cavnas.getContext('2d');
        for(let i = 0; i < 6; i++) {
          for(let j = 0; j < 6; j++) {
            ctx.strokeStyle = `rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)})`;
            ctx.beginPath();
            ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
            ctx.stroke();
          }
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
