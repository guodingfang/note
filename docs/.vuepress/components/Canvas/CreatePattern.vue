<template>
  <div>
    <canvas id="canvasCreatePattern"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasCreatePattern').getContext('2d');

    const img = new Image();
    img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';

    img.onload = () => {
      const ptrn = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = ptrn;
      ctx.fillRect(0, 0, 150, 150);
    }
  }
}
</script>

<style lang="scss">

</style>
