<template>
  <div>
    <canvas id="canvasPath2D" width="150" height="150"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = document.getElementById('canvasPath2D');
    if(canvas.getContext) {
      const ctx = canvas.getContext('2d');

      const rectangle = new Path2D();
      rectangle.rect(10, 10, 50, 50);

      const circle = new Path2D();
      circle.moveTo(125, 35);
      circle.arc(100, 35, 25, 0, 2 * Math.PI);

      ctx.stroke(rectangle);
      ctx.fill(circle);
    }
  }
}
</script>

<style lang="scss">

</style>
