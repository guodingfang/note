<template>
  <div>
    <canvas id="canvasPath" width="100" height="100"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = document.getElementById('canvasPath');
    if(canvas.getContext) {
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(75, 50);
      ctx.lineTo(100, 75);
      ctx.lineTo(100, 25);
      ctx.fill();
    }
  }
}
</script>

<style lang="scss">

</style>
