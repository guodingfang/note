<template>
  <div>
    <svg width="300" height="100">
      <circle cx="30" cy="50" r="25"></circle>
      <circle cx="90"  cy="50" r="25" class="red" />
      <circle cx="150" cy="50" r="25" class="fancy" />
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .red {
    fill: red
  }
  .fancy {
    fill: none;
    stroke: black;
    stroke-width: 3pt;
  }
</style>
