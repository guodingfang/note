<template>
  <div>
    <canvas id="canvasDrawImage" width="300" height="150"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      const canvas = document.getElementById('canvasDrawImage');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = function(){
        ctx.drawImage(img, 0, 0);
        ctx.beginPath();
        ctx.moveTo(30, 96);
        ctx.lineTo(70, 66);
        ctx.lineTo(103, 76);
        ctx.lineTo(170, 15);
        ctx.stroke();
      }
      img.src = 'https://mdn.mozillademos.org/files/206/Canvas_backdrop.png';
    }
  }
</script>

<style lang="scss">

</style>
