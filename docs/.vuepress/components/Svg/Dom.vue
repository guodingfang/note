<template>
  <div>
    <svg id="mysvg">
      <circle id="mycircle" cx="70" cy="70" r="50" @click="click" />
    </svg>
  </div>
</template>

<script>
export default {
  methods: {
    click(e) {
      const r = Number(e.target.getAttribute('r'));
      const _r =  r % 20 ? r + 10 : r - 10;
      e.target.setAttribute('r', _r)
    }
  }
}
</script>

<style scoped lang="scss">
  circle {
    stroke-width: 5;
    stroke: #f00;
    fill: #ff0;
  }

  circle:hover {
    stroke: #090;
    fill: #fff;
  }
</style>
