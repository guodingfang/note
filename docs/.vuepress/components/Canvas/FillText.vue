<template>
  <div>
    <canvas id="canvasFillText"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById('canvasFillText').getContext('2d');
    ctx.font = "48px serif";
    ctx.fillText("Hello world", 10, 50);
  }
}
</script>

<style lang="scss">

</style>
