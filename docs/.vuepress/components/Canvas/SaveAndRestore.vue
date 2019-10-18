<template>
  <div>
    <canvas id="canvasSaveAndRestore"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasSaveAndRestore').getContext('2d');

    ctx.fillRect(0, 0, 150, 150);
    ctx.save();

    ctx.fillStyle = '#09F';
    ctx.fillRect(15, 15, 120, 120);

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(30, 30, 90, 90);

    ctx.restore();
    ctx.fillRect(45, 45, 60, 60);

    ctx.restore();
    ctx.fillRect(60, 60, 30, 30);
  }
}
</script>

<style lang="scss">

</style>
