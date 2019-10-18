<template>
  <div>
    <canvas id="canvasArc"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasArc').getContext('2d');

    ctx.beginPath();

    ctx.arc(50, 50, 50, 0, 2*Math.PI, false);
    ctx.fillStyle = 'rgba(255, 85, 45, 0.6)';
    ctx.fill();

    ctx.beginPath();

    ctx.arc(150, 50, 50, 0, 2*Math.PI, false);
    ctx.strokeStyle = 'rgba(85, 45, 255, 0.6)';
    ctx.stroke();
  }
}
</script>

<style lang="scss">

</style>
