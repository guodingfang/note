<template>
  <div>
    <canvas id="canvasRotate" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const ctx = document.getElementById('canvasRotate').getContext('2d');

      ctx.translate(75, 75);

      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.strokeStyle = `rgb(${51*i}, ${255-51*i}, 255)`;
        for (let j = 0, max = i*6; j < max; j++) {
          ctx.rotate(Math.PI*2/(i*6));
          ctx.beginPath();
          ctx.arc(0, i*12.5, 5, 0, Math.PI*2, true);
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  }
</script>

<style lang="scss">

</style>
