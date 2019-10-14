<template>
  <div>
    <canvas id="canvasLinearGradient" width="150" height="150"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = document.getElementById('canvasLinearGradient');
    if(canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const lingrad = ctx.createLinearGradient(0, 0, 0, 150);
      lingrad.addColorStop(0, '#00ABEB');
      lingrad.addColorStop(0.5, '#fff');
      lingrad.addColorStop(0.5, '#26C000');
      lingrad.addColorStop(1, '#fff');
      ctx.fillStyle = lingrad;

      ctx.fillRect(10,10,130,130);
    }
  }
}
</script>

<style lang="scss">

</style>
