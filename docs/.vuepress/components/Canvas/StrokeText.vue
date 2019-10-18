<template>
  <div>
    <canvas id="canvasStrokeText"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasStrokeText').getContext('2d');
    ctx.font = '48px serif';
    ctx.strokeText('Hello world', 10, 50);
  }
}
</script>

<style lang="scss">

</style>
