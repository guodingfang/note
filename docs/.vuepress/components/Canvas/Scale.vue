<template>
  <div>
    <canvas id="canvasScale"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasScale').getContext('2d');
    ctx.save();
    ctx.scale(10, 3);
    ctx.fillRect(1, 10, 10, 10);
    ctx.restore();

    ctx.scale(-1, 1);
    ctx.font = '48px serif';
    ctx.fillText('MDN', -135, 120);
  }
}
</script>

<style lang="scss">

</style>
