<template>
  <div>
    <canvas id="canvasRotate"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasRotate').getContext('2d');
    ctx.translate(75,75);

    for (let i = 1; i < 6; i++) {
      ctx.save();

      ctx.fillStyle = `rgb(${51*i}, ${255-51*i}, 255)`;

      for (let j = 0; j < i*6; j++) {
        ctx.rotate(Math.PI*2/(i*6));
        ctx.beginPath();
        ctx.arc(0, i*12.5, 5, 0, Math.PI*2, true);
        ctx.fill();
      }
      ctx.restore();
    }
  }
}
</script>

<style lang="scss">

</style>
