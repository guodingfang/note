<template>
  <div>
    <svg width="300" height="100">
      <g id="myCircle2">
        <text x="35" y="20">圆形</text>
        <circle cx="50" cy="50" r="20" />
      </g>

      <use href="#myCircle2" x="100" y="0" fill="blue" />
      <use href="#myCircle2" x="200" y="0" fill="white" stroke="blue" />
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>
