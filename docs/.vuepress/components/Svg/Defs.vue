<template>
  <div>
    <svg>
      <defs>
        <g id="myCircle3">
          <text x="25" y="20">圆形</text>
          <circle cx="50" cy="50" r="20" />
        </g>
      </defs>

      <use href="#myCircle3" x="0" y="0" />
      <use href="#myCircle3" x="100" y="0" fill="blue" />
      <use href="#myCircle3" x="200" y="0" fill="white" stroke="blue" />
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>
