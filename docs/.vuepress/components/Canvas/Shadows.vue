<template>
  <div>
    <canvas id="canvasShadows"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasShadows').getContext('2d');

    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

    ctx.font = "20px Times New Roman";

    ctx.fillStyle = "Black";

    ctx.fillText("Sample String", 5, 30);
  }
}
</script>

<style lang="scss">

</style>
