<template>
  <div>
    <canvas id="canvasRadialGradient" width="150" height="150"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasRadialGradient').getContext('2d');
    const radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(0.9, '#019F62');
    radgrad.addColorStop(1, 'rgba(1,159,98,0)');
    ctx.fillStyle = radgrad;
    ctx.fillRect(0,0,150,150);
  }
}
</script>

<style lang="scss">

</style>
