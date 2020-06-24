<template>
  <div>
    <canvas id="canvasPatterns" width="150" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const ctx = document.getElementById('canvasPatterns').getContext('2d');
      const img = new Image();
      img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
      img.onload = function () {
        const pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 150, 150);
      }
    }
  }
</script>

<style lang="scss">

</style>
