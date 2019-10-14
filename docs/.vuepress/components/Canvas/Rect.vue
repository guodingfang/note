<template>
  <div>
    <canvas id="canvasRect" width="150" height="150"></canvas>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = document.getElementById('canvasRect');
    if(canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
    }
  }
}
</script>

<style lang="scss">

</style>
